import type {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
} from 'react';
import {
    ConnectingHandle,
    Connection,
    ConnectionMode,
    ConnectionStatus,
    Dimensions,
    Edge,
    HandleType,
    Node,
    NodeHandleBounds,
    XYPosition,
    clamp,
    internalsSymbol,
} from 'reactflow';
import { Transform } from '../types';
import { ConnectionHandle, ValidConnectionFunc } from './types';

export const isMouseEvent = (
    event: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent
): event is MouseEvent | ReactMouseEvent => 'clientX' in event;

export const getHostForElement = (
    element: HTMLElement
): Document | ShadowRoot => element.getRootNode() as Document | ShadowRoot;

export const getEventPosition = (
    event: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent,
    bounds?: DOMRect
) => {
    const isMouseTriggered = isMouseEvent(event);
    const evtX = isMouseTriggered ? event.clientX : event.touches[0].clientX;
    const evtY = isMouseTriggered ? event.clientY : event.touches[0].clientY;

    return {
        x: evtX - (bounds?.left ?? 0),
        y: evtY - (bounds?.top ?? 0),
    };
};

export function getHandleType(
    edgeUpdaterType: HandleType | undefined,
    handleDomNode: Element | null
): HandleType | null {
    if (edgeUpdaterType) {
        return edgeUpdaterType;
    } else if (handleDomNode?.classList.contains('target')) {
        return 'target';
    } else if (handleDomNode?.classList.contains('source')) {
        return 'source';
    }

    return null;
}

type GetHandleLookupParams = {
    nodes: Node[];
    nodeId: string;
    handleId: string | null;
    handleType: string;
};

// this functions collects all handles and adds an absolute position
// so that we can later find the closest handle to the mouse position
export function getHandles(
    node: Node,
    handleBounds: NodeHandleBounds,
    type: HandleType,
    currentHandle: string
): ConnectionHandle[] {
    return (handleBounds[type] || []).reduce<ConnectionHandle[]>((res, h) => {
        if (`${node.id}-${h.id}-${type}` !== currentHandle) {
            res.push({
                id: h.id || null,
                type,
                nodeId: node.id,
                x: (node.positionAbsolute?.x ?? 0) + h.x + h.width / 2,
                y: (node.positionAbsolute?.y ?? 0) + h.y + h.height / 2,
            });
        }
        return res;
    }, []);
}

export function getHandleLookup({
    nodes,
    nodeId,
    handleId,
    handleType,
}: GetHandleLookupParams) {
    return nodes.reduce<ConnectionHandle[]>((res, node) => {
        if (node[internalsSymbol]) {
            const { handleBounds } = node[internalsSymbol];
            let sourceHandles: ConnectionHandle[] = [];
            let targetHandles: ConnectionHandle[] = [];

            if (handleBounds) {
                sourceHandles = getHandles(
                    node,
                    handleBounds,
                    'source',
                    `${nodeId}-${handleId}-${handleType}`
                );
                targetHandles = getHandles(
                    node,
                    handleBounds,
                    'target',
                    `${nodeId}-${handleId}-${handleType}`
                );
            }

            res.push(...sourceHandles, ...targetHandles);
        }
        return res;
    }, []);
}

type Result = {
    handleDomNode: Element | null;
    isValid: boolean;
    connection: Connection;
    endHandle: ConnectingHandle | null;
};

const nullConnection: Connection = {
    source: null,
    target: null,
    sourceHandle: null,
    targetHandle: null,
};

const defaultResult = (): Result => ({
    handleDomNode: null,
    isValid: false,
    connection: nullConnection,
    endHandle: null,
});

export function getClosestHandle(
    event: MouseEvent | TouchEvent | ReactMouseEvent | ReactTouchEvent,
    doc: Document | ShadowRoot,
    pos: XYPosition,
    connectionRadius: number,
    handles: ConnectionHandle[],
    validator: (
        handle: Pick<ConnectionHandle, 'nodeId' | 'id' | 'type'>
    ) => Result
) {
    // we always want to prioritize the handle below the mouse cursor over the closest distance handle,
    // because it could be that the center of another handle is closer to the mouse pointer than the handle below the cursor
    const { x, y } = getEventPosition(event);
    const domNodes = doc.elementsFromPoint(x, y);

    const handleBelow = domNodes.find((el) =>
        el.classList.contains('react-flow__handle')
    );

    if (handleBelow) {
        const handleNodeId = handleBelow.getAttribute('data-nodeid');

        if (handleNodeId) {
            const handleType = getHandleType(undefined, handleBelow);
            const handleId = handleBelow.getAttribute('data-handleid');
            const validHandleResult = validator({
                nodeId: handleNodeId,
                id: handleId,
                type: handleType,
            });

            // if (validHandleResult) {
            return {
                handle: {
                    id: handleId,
                    type: handleType,
                    nodeId: handleNodeId,
                    x: pos.x,
                    y: pos.y,
                },
                validHandleResult,
            };
            // }
        }
    }

    // if we couldn't find a handle below the mouse cursor we look for the closest distance based on the connectionRadius
    let closestHandles: {
        handle: ConnectionHandle;
        validHandleResult: Result;
    }[] = [];
    let minDistance = Infinity;

    handles.forEach((handle) => {
        const distance = Math.sqrt(
            (handle.x - pos.x) ** 2 + (handle.y - pos.y) ** 2
        );

        if (distance <= connectionRadius) {
            const validHandleResult = validator(handle);

            if (distance <= minDistance) {
                if (distance < minDistance) {
                    closestHandles = [{ handle, validHandleResult }];
                } else if (distance === minDistance) {
                    // when multiple handles are on the same distance we collect all of them
                    closestHandles.push({
                        handle,
                        validHandleResult,
                    });
                }

                minDistance = distance;
            }
        }
    });

    if (!closestHandles.length) {
        return { handle: null, validHandleResult: defaultResult() };
    }

    if (closestHandles.length === 1) {
        return closestHandles[0];
    }

    const hasValidHandle = closestHandles.some(
        ({ validHandleResult }) => validHandleResult.isValid
    );
    const hasTargetHandle = closestHandles.some(
        ({ handle }) => handle.type === 'target'
    );

    // if multiple handles are layouted on top of each other we prefer the one with type = target and the one that is valid
    return (
        closestHandles.find(({ handle, validHandleResult }) =>
            hasTargetHandle
                ? handle.type === 'target'
                : hasValidHandle
                ? validHandleResult.isValid
                : true
        ) || closestHandles[0]
    );
}

// returns a number between 0 and 1 that represents the velocity of the movement
// when the mouse is close to the edge of the canvas
const calcAutoPanVelocity = (
    value: number,
    min: number,
    max: number
): number => {
    if (value < min) {
        return clamp(Math.abs(value - min), 1, 50) / 50;
    } else if (value > max) {
        return -clamp(Math.abs(value - max), 1, 50) / 50;
    }

    return 0;
};

export const calcAutoPan = (pos: XYPosition, bounds: Dimensions): number[] => {
    const xMovement = calcAutoPanVelocity(pos.x, 35, bounds.width - 35) * 20;
    const yMovement = calcAutoPanVelocity(pos.y, 35, bounds.height - 35) * 20;

    return [xMovement, yMovement];
};

export function getConnectionStatus(
    isInsideConnectionRadius: boolean,
    isHandleValid: boolean
) {
    let connectionStatus = null;

    if (isHandleValid) {
        connectionStatus = 'valid';
    } else if (isInsideConnectionRadius) {
        connectionStatus = 'invalid';
    }

    return connectionStatus as ConnectionStatus;
}

export const rendererPointToPoint = (
    { x, y }: XYPosition,
    [tx, ty, tScale]: Transform
): XYPosition => {
    return {
        x: x * tScale + tx,
        y: y * tScale + ty,
    };
};

export const pointToRendererPoint = (
    { x, y }: XYPosition,
    [tx, ty, tScale]: Transform,
    snapToGrid: boolean,
    [snapX, snapY]: [number, number]
): XYPosition => {
    const position: XYPosition = {
        x: (x - tx) / tScale,
        y: (y - ty) / tScale,
    };

    if (snapToGrid) {
        return {
            x: snapX * Math.round(position.x / snapX),
            y: snapY * Math.round(position.y / snapY),
        };
    }

    return position;
};

// checks if  and returns connection in form of an object { source: 123, target: 312 }
export function isValidHandle(
    handle: Pick<ConnectionHandle, 'nodeId' | 'id' | 'type'>,
    connectionMode: ConnectionMode,
    fromNodeId: string,
    fromHandleId: string | null,
    fromType: HandleType,
    isValidConnection: ValidConnectionFunc,
    doc: Document | ShadowRoot
) {
    const isTarget = fromType === 'target';
    const handleToCheck = doc.querySelector(
        `.react-flow__handle[data-id="${handle.nodeId}-${handle.id}-${handle.type}"]`
    );

    const result = {
        ...defaultResult(),
        handleDomNode: handleToCheck,
    };

    if (handleToCheck) {
        const handleType = getHandleType(undefined, handleToCheck);
        const handleNodeId = handleToCheck.getAttribute('data-nodeid');
        const handleId = handleToCheck.getAttribute('data-handleid');
        const connectable = handleToCheck.classList.contains('connectable');
        const connectableEnd =
            handleToCheck.classList.contains('connectableend');

        const connection: Connection = {
            source: isTarget ? handleNodeId : fromNodeId,
            sourceHandle: isTarget ? handleId : fromHandleId,
            target: isTarget ? fromNodeId : handleNodeId,
            targetHandle: isTarget ? fromHandleId : handleId,
        };

        result.connection = connection;

        const isConnectable = connectable && connectableEnd;
        // in strict mode we don't allow target to target or source to source connections
        const isValid =
            isConnectable &&
            (connectionMode === ConnectionMode.Strict
                ? (isTarget && handleType === 'source') ||
                  (!isTarget && handleType === 'target')
                : handleNodeId !== fromNodeId || handleId !== fromHandleId);

        if (isValid) {
            result.endHandle = {
                nodeId: handleNodeId as string,
                handleId,
                type: handleType as HandleType,
            };

            result.isValid = isValidConnection(connection);
        }
    }

    return result;
}

export function resetRecentHandle(handleDomNode: Element | undefined): void {
    handleDomNode?.classList.remove(
        'valid',
        'connecting',
        'react-flow__handle-valid',
        'react-flow__handle-connecting'
    );
}

export const isEdge = (element: Node | Connection | Edge): element is Edge =>
    'id' in element && 'source' in element && 'target' in element;

const getEdgeId = ({
    source,
    sourceHandle,
    target,
    targetHandle,
}: Connection): string =>
    `reactflow__edge-${source}${sourceHandle || ''}-${target}${
        targetHandle || ''
    }`;

const connectionExists = (edge: Edge, edges: Edge[]) => {
    return edges.some(
        (el) =>
            el.source === edge.source &&
            el.target === edge.target &&
            (el.sourceHandle === edge.sourceHandle ||
                (!el.sourceHandle && !edge.sourceHandle)) &&
            (el.targetHandle === edge.targetHandle ||
                (!el.targetHandle && !edge.targetHandle))
    );
};

export const addEdge = (
    edgeParams: Edge | Connection,
    edges: Edge[]
): Edge[] => {
    if (!edgeParams.source || !edgeParams.target) {
        // devWarn('006', errorMessages['error006']());
        console.error('edge is missing source or target');
        return edges;
    }

    let edge: Edge;
    if (isEdge(edgeParams)) {
        edge = { ...edgeParams };
    } else {
        edge = {
            ...edgeParams,
            id: getEdgeId(edgeParams),
        } as Edge;
    }

    if (connectionExists(edge, edges)) {
        return edges;
    }

    return edges.concat(edge);
};
