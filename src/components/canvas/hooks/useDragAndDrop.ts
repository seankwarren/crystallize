import { devLog } from '@utils/.';
import { DragEventHandler, useCallback } from 'react';
import {
    Node as CanvasNode,
    NodeChange,
    NodeDragHandler,
    OnEdgesDelete,
    OnNodesDelete,
    SelectionDragHandler,
} from 'reactflow';
import ShortUniqueId from 'short-unique-id';
import { draggingCardNode } from '../nodes';
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

    const onDrag: DragEventHandler = useCallback(
        (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            if (store.canvasRef.current) {
                const reactFlowBounds =
                    store.canvasRef.current.getBoundingClientRect();

                const position = store.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

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
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const reactFlowBounds =
                store.canvasRef.current.getBoundingClientRect();
            devLog(`type dropped: ${type}`);
            const draggedNode = store.nodes.find(
                (n) => n.id === 'dragging-card'
            );
            if (!draggedNode) {
                console.warn("couldn't find dragged node");
                return;
            }
            const position = store.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode: CanvasNode = {
                id: `card-node-${uid()}`,
                type,
                position,
                data: { label: `${type} node` },
                selected: false,
            };
            takeSnapshot({
                nodes: store.nodes,
                edges: store.edges,
            });
            store.addNode(newNode);
            store.deleteElements([draggedNode], []);
            store.setSelectedNodes([newNode]);
            store.setSelectedEdges([]);
        },
        [store, takeSnapshot]
    );

    // TODO: fix this
    const onDragEnd = useCallback(
        (event: DragEvent) => {
            if (!event.dataTransfer || !store.canvasRef.current) return;
            if (event.dataTransfer.dropEffect !== 'none') return;

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const reactFlowBounds =
                store.canvasRef.current.getBoundingClientRect();
            devLog(`type dropped: ${type}`);
            const draggedNode = store.nodes.find(
                (n) => n.id === 'dragging-card'
            );
            if (!draggedNode) {
                console.warn("couldn't find dragged node");
                return;
            }

            const position = store.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode: CanvasNode = {
                id: `card-node-${uid()}`,
                type,
                position,
                data: { label: `${type} node` },
                selected: false,
            };
            takeSnapshot({
                nodes: store.nodes,
                edges: store.edges,
            });
            store.addNode(newNode);
            store.deleteElements([draggedNode], []);
            store.setSelectedNodes([newNode]);
            store.setSelectedEdges([]);
        },
        [store, takeSnapshot]
    );

    return {
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDrag,
        onDrop,
        onDragEnd,
    };
};

export default useDragAndDrop;
