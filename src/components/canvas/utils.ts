import { Edge, Node, getRectOfNodes } from 'reactflow';
import { CanvasStore } from './hooks/types';
import { selectionNode } from './nodes/nodeLibrary';

export const drawSelectionHighlight = (store: CanvasStore): void => {
    store.setNodes((prev) => {
        const selectedNodes = prev.filter((node) => node.selected);
        if (selectedNodes.length <= 1) return prev;
        const { x, y, width, height } = getRectOfNodes(selectedNodes);
        console.log(width, height);
        const selection = {
            ...selectionNode,
            position: { x, y },
            width,
            height,
        };
        const newNodes = [
            ...prev.filter((node) => node.id !== selection.id), //remove previous selection
            selection,
        ];
        return newNodes;
    });
};

export const getSelectedNodes = <T, U extends string | undefined>(
    nodes: Node<T, U>[]
): Node<T, U>[] => nodes.filter((node) => node.selected);

export const getSelectedEdges = <T>(edges: Edge<T>[]): Edge<T>[] =>
    edges.filter((node) => node.selected);
