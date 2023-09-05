import { DragEvent, DragEventHandler, useCallback } from 'react';
import {
    NodeChange,
    NodeDragHandler,
    OnEdgesDelete,
    OnNodesDelete,
    SelectionDragHandler,
} from 'reactflow';
import ShortUniqueId from 'short-unique-id';
import { NodeTypes, draggingCardNode, introNode } from '../nodes';
import { getCenterNodeOnCoords, getDefaultNodeSize } from '../nodes/utils';
import { CanvasStore } from './useCanvasState';
import { HistoryItem } from './useUndoRedo';

type Props = {
    store: CanvasStore;
    takeSnapshot: (store: HistoryItem) => void;
};

const uid = new ShortUniqueId({ length: 10 });

const useDragAndDrop = ({ store, takeSnapshot }: Props) => {
    const onNodeDragStart: NodeDragHandler = useCallback(() => {
        takeSnapshot({
            nodes: store.nodes,
            edges: store.edges,
        });
    }, [takeSnapshot, store]);

    const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
        takeSnapshot({
            nodes: store.nodes,
            edges: store.edges,
        });
    }, [takeSnapshot, store]);

    const onNodesDelete: OnNodesDelete = useCallback(() => {
        takeSnapshot({
            nodes: store.nodes,
            edges: store.edges,
        });
    }, [takeSnapshot, store]);

    const onEdgesDelete: OnEdgesDelete = useCallback(() => {
        takeSnapshot({
            nodes: store.nodes,
            edges: store.edges,
        });
    }, [takeSnapshot, store]);

    const onDragStart = (event: DragEvent, nodeType: NodeTypes) => {
        store.setSelectedEdges([]);
        store.setSelectedNodes([]);

        const blankCanvas = document.createElement('canvas');
        document.body.appendChild(blankCanvas);
        event.dataTransfer.setDragImage(blankCanvas, 0, 0);

        const position = getCenterNodeOnCoords(
            nodeType,
            { x: event.clientX, y: event.clientY },
            store
        );

        // set the position of the dragging node to the mouse position
        // and set the type of the node to the type of the node being dragged
        const draggedNode = {
            ...draggingCardNode,
            position,
            data: {
                ...draggingCardNode.data,
                draggedType: nodeType,
            },
        };

        store.addNode(draggedNode);
    };

    const onDrag: DragEventHandler = useCallback(
        (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            if (store.canvasRef.current) {
                const draggedNode = store.getNode('dragging-card');
                if (!draggedNode) return;

                const position = getCenterNodeOnCoords(
                    draggedNode.data.draggedType as NodeTypes,
                    { x: event.clientX, y: event.clientY },
                    store
                );

                const nodeChange: NodeChange = {
                    id: draggingCardNode.id,
                    type: 'position',
                    position,
                };
                store.updateNode(draggingCardNode.id, [nodeChange]);
            }
        },
        [store]
    );

    const onDrop: DragEventHandler = useCallback(
        (event) => {
            if (!store.canvasRef.current) return;

            const draggedNode = store.nodes.find(
                (n) => n.id === 'dragging-card'
            );

            if (!draggedNode) {
                console.warn("couldn't find dragged node");
                return;
            }

            const type = draggedNode.data.draggedType as NodeTypes | undefined;

            if (!type) {
                console.warn("couldn't find dragged type");
                return;
            }

            const { width: defaultWidth, height: defaultHeight } =
                getDefaultNodeSize(type);

            const position = getCenterNodeOnCoords(
                type,
                { x: event.clientX, y: event.clientY },
                store
            );

            const newNode = {
                id: `card-node-${uid()}`,
                type,
                position,
                style: {
                    width: defaultWidth,
                    height: defaultHeight,
                },
                data: { label: `${type} node`, isResizable: true },
                selected: false,
            };

            takeSnapshot({
                nodes: store.nodes.filter((node) => node.id !== draggedNode.id),
                edges: store.edges,
            });

            store.deleteElements([draggedNode, introNode], []);
            store.addNode(newNode);
            store.setSelectedNodes([newNode]);
        },
        [store, takeSnapshot]
    );

    // TODO: fix this
    // const onDragEnd = useCallback(
    //     (event: DragEvent) => {
    //         if (!event.dataTransfer || !store.canvasRef.current) return;
    //         if (event.dataTransfer.dropEffect !== 'none') return;
    //         const type = event.dataTransfer.getData(
    //             'application/reactflow'
    //         ) as NodeTypes;
    //         if (typeof type === 'undefined') {
    //             return;
    //         }
    //         const reactFlowBounds =
    //             store.canvasRef.current.getBoundingClientRect();
    //         devLog(`type dropped: ${type}`);
    //         const draggedNode = store.nodes.find(
    //             (n) => n.id === 'dragging-card'
    //         );
    //         if (!draggedNode) {
    //             console.warn("couldn't find dragged node");
    //             return;
    //         }
    //         const position = store.project({
    //             x: event.clientX - reactFlowBounds.left,
    //             y: event.clientY - reactFlowBounds.top,
    //         });
    //         const newNode: CanvasNode<NodeData, NodeTypes> = {
    //             id: `card-node-${uid()}`,
    //             type,
    //             position,
    //             data: { label: `${type} node`, isResizable: true },
    //             selected: false,
    //         };
    //         store.deleteElements([draggedNode], []);
    //         takeSnapshot({
    //             nodes: store.nodes,
    //             edges: store.edges,
    //         });
    //         store.addNode(newNode);
    //         store.setSelectedNodes([newNode]);
    //         store.setSelectedEdges([]);
    // },
    //     [store, takeSnapshot]
    // );

    return {
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDragStart,
        onDrag,
        onDrop,
        // onDragEnd,
    };
};

export default useDragAndDrop;
