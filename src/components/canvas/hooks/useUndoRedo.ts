import { useCallback, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { CanvasStore } from './useCanvasState';

type UseUndoRedoOptions = {
    maxHistorySize?: number;
};

type UseUndoRedo = (options: UseUndoRedoOptions) => {
    undo: (store: CanvasStore) => void;
    redo: (store: CanvasStore) => void;

    takeSnapshot: (store: HistoryItem) => void;
    canUndo: boolean;
    canRedo: boolean;
};

export type HistoryItem = {
    nodes: Node[];
    edges: Edge[];
};

export const useUndoRedo: UseUndoRedo = ({
    maxHistorySize = 100,
}: UseUndoRedoOptions) => {
    const [past, setPast] = useState<HistoryItem[]>([]);
    const [future, setFuture] = useState<HistoryItem[]>([]);

    const takeSnapshot = useCallback(
        (store: HistoryItem) => {
            setPast((past) => [
                ...past.slice(past.length - maxHistorySize + 1, past.length),
                {
                    nodes: store.nodes,
                    edges: store.edges,
                },
            ]);

            setFuture([]);
        },
        [maxHistorySize]
    );

    const undo = useCallback(
        (store: CanvasStore) => {
            const pastState = past[past.length - 1];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (pastState) {
                setPast((past) => past.slice(0, past.length - 1));
                setFuture((future) => [
                    ...future,
                    {
                        nodes: store.nodes,
                        edges: store.edges,
                    },
                ]);
                store.setNodes(pastState.nodes);
                store.setEdges(pastState.edges);
            }
        },
        [past]
    );

    const redo = useCallback(
        (store: CanvasStore) => {
            const futureState = future[future.length - 1];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (futureState) {
                setFuture((future) => future.slice(0, future.length - 1));
                setPast((past) => [
                    ...past,
                    {
                        nodes: store.nodes,
                        edges: store.edges,
                    },
                ]);
                store.setNodes(futureState.nodes);
                store.setEdges(futureState.edges);
            }
        },
        [future]
    );

    return {
        undo,
        redo,
        takeSnapshot,
        canUndo: !!past.length,
        canRedo: !!future.length,
    };
};

export default useUndoRedo;
