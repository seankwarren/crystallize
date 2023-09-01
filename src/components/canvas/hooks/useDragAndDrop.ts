import { DragEventHandler, useCallback, useRef, useState } from 'react';
import {
    Node,
    NodeDragHandler,
    OnEdgesDelete,
    OnNodesDelete,
    ReactFlowInstance,
    SelectionDragHandler,
} from 'reactflow';
import { defaultNodeHeight, defaultNodeWidth } from '../styles/styles';
import { CanvasState } from './useCanvasState';

type Props = {
    state: CanvasState;
    takeSnapshot: (state: CanvasState) => void;
};

let id = 0;
const getId = () => `dndnode_${id++}`; // TODO: make a getId function

const useDragAndDrop = ({ state, takeSnapshot }: Props) => {
    const [canvasInstance, setCanvasInstance] =
        useState<ReactFlowInstance | null>(null);
    const canvasWrapper = useRef<HTMLDivElement>(null);

    const onNodeDragStart: NodeDragHandler = useCallback(() => {
        takeSnapshot(state);
    }, [takeSnapshot, state]);

    const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
        takeSnapshot(state);
    }, [takeSnapshot, state]);

    const onNodesDelete: OnNodesDelete = useCallback(() => {
        takeSnapshot(state);
    }, [takeSnapshot, state]);

    const onEdgesDelete: OnEdgesDelete = useCallback(() => {
        takeSnapshot(state);
    }, [takeSnapshot, state]);

    const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop: DragEventHandler = useCallback(
        (event) => {
            event.preventDefault();

            if (canvasWrapper.current && canvasInstance) {
                const reactFlowBounds =
                    canvasWrapper.current.getBoundingClientRect();
                const type = event.dataTransfer.getData(
                    'application/reactflow'
                );

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !type) {
                    return;
                }

                const position = canvasInstance.project({
                    x:
                        event.clientX -
                        reactFlowBounds.left -
                        defaultNodeWidth / 2,
                    y:
                        event.clientY -
                        reactFlowBounds.top -
                        defaultNodeHeight / 2,
                });

                const newNode: Node = {
                    id: getId(),
                    type,
                    position,
                    data: { label: `${type} node` },
                };

                state.addNode(newNode);
            }
        },
        [canvasInstance, takeSnapshot, state]
    );

    return {
        setCanvasInstance,
        canvasWrapper,
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDragOver,
        onDrop,
    };
};

export default useDragAndDrop;
