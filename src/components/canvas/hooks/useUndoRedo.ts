import { useCallback, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { CanvasState } from './useCanvasState';

type UseUndoRedoOptions = {
    maxHistorySize?: number;
};

type UseUndoRedo = (options: UseUndoRedoOptions) => {
    undo: (state: CanvasState) => void;
    redo: (state: CanvasState) => void;

    takeSnapshot: (state: CanvasState) => void;
    canUndo: boolean;
    canRedo: boolean;
};

type HistoryItem = {
    nodes: Node[];
    edges: Edge[];
};

export const useUndoRedo: UseUndoRedo = ({
    maxHistorySize = 100,
}: UseUndoRedoOptions) => {
    const [past, setPast] = useState<HistoryItem[]>([]);
    const [future, setFuture] = useState<HistoryItem[]>([]);

    const takeSnapshot = useCallback(
        (state: CanvasState) => {
            console.log(state.nodes[0].position);
            setPast((past) => [
                ...past.slice(past.length - maxHistorySize + 1, past.length),
                { nodes: state.nodes, edges: state.edges },
            ]);

            setFuture([]);
        },
        [maxHistorySize]
    );

    const undo = useCallback(
        (state: CanvasState) => {
            console.log(past[past.length - 1]);
            const pastState = past[past.length - 1];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (pastState) {
                setPast((past) => past.slice(0, past.length - 1));
                setFuture((future) => [
                    ...future,
                    { nodes: state.nodes, edges: state.edges },
                ]);
                state.setNodes(pastState.nodes);
                state.setEdges(pastState.edges);
            }
        },
        [past]
    );

    const redo = useCallback(
        (state: CanvasState) => {
            const futureState = future[future.length - 1];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (futureState) {
                setFuture((future) => future.slice(0, future.length - 1));
                setPast((past) => [
                    ...past,
                    { nodes: state.nodes, edges: state.edges },
                ]);
                state.setNodes(futureState.nodes);
                state.setEdges(futureState.edges);
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
