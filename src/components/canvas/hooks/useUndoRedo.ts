import { useCanvasStore } from '@stores/canvas';
import { useCallback, useState } from 'react';
import { Edge, Node } from 'reactflow';

type UseUndoRedoOptions = {
    maxHistorySize?: number;
};

type UseUndoRedo = (options: UseUndoRedoOptions) => {
    undo: () => void;
    redo: () => void;
    takeSnapshot: () => void;
    canUndo: boolean;
    canRedo: boolean;
};

type HistoryItem = {
    nodes: Node[];
    edges: Edge[];
};

export const useUndoRedo: UseUndoRedo = (props = {}) => {
    const { maxHistorySize = 100 } = props;
    const [past, setPast] = useState<HistoryItem[]>([]);
    const [future, setFuture] = useState<HistoryItem[]>([]);

    const { nodes, setNodes, edges, setEdges } = useCanvasStore();

    const takeSnapshot = useCallback(() => {
        setPast((past) => [
            ...past.slice(past.length - maxHistorySize + 1, past.length),
            { nodes: nodes, edges: edges },
        ]);

        setFuture([]);
    }, [nodes, edges, maxHistorySize]);

    const undo = useCallback(() => {
        const pastState = past[past.length - 1];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (pastState) {
            setPast((past) => past.slice(0, past.length - 1));
            setFuture((future) => [...future, { nodes, edges }]);
            setNodes(pastState.nodes);
            setEdges(pastState.edges);
        }
    }, [setNodes, setEdges, nodes, edges, past]);

    const redo = useCallback(() => {
        const futureState = future[future.length - 1];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (futureState) {
            setFuture((future) => future.slice(0, future.length - 1));
            setPast((past) => [...past, { nodes, edges }]);
            setNodes(futureState.nodes);
            setEdges(futureState.edges);
        }
    }, [setNodes, setEdges, nodes, edges, future]);

    return {
        undo,
        redo,
        takeSnapshot,
        canUndo: !!past.length,
        canRedo: !!future.length,
    };
};

export default useUndoRedo;
