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

type Props = {
    takeSnapshot: () => void;
    nodes: Node[];
    setNodes: (nodes: Node[]) => void;
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const useDragAndDrop = ({ takeSnapshot, nodes, setNodes }: Props) => {
    const [canvasInstance, setCanvasInstance] =
        useState<ReactFlowInstance | null>(null);
    const canvasWrapper = useRef<HTMLDivElement>(null);

    const onNodeDragStart: NodeDragHandler = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onNodesDelete: OnNodesDelete = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onEdgesDelete: OnEdgesDelete = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop: DragEventHandler = useCallback(
        (event) => {
            event.preventDefault();

            if (canvasWrapper.current && canvasInstance) {
                takeSnapshot();
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

                setNodes(nodes.concat(newNode));
            }
        },
        [canvasInstance, nodes, setNodes, takeSnapshot]
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
