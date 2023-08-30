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

// https://redux.js.org/usage/implementing-undo-history
export const useUndoRedo: UseUndoRedo = (props = {}) => {
    const { maxHistorySize = 100 } = props;
    // the past and future arrays store the states that we can jump to
    const [past, setPast] = useState<HistoryItem[]>([]);
    const [future, setFuture] = useState<HistoryItem[]>([]);

    const { nodes, setNodes, edges, setEdges } = useCanvasStore();

    const takeSnapshot = useCallback(() => {
        // push the current graph to the past state
        setPast((past) => [
            ...past.slice(past.length - maxHistorySize + 1, past.length),
            { nodes: nodes, edges: edges },
        ]);

        console.log('snapped');
        console.log(past);
        // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
        setFuture([]);
    }, [nodes, edges, maxHistorySize]);

    const undo = useCallback(() => {
        // get the last state that we want to go back to
        const pastState = past[past.length - 1];
        console.log('undoing', past);
        if (pastState) {
            // first we remove the state from the history
            setPast((past) => past.slice(0, past.length - 1));
            // we store the current graph for the redo operation
            setFuture((future) => [...future, { nodes, edges }]);
            // now we can set the graph to the past state
            setNodes(pastState.nodes);
            setEdges(pastState.edges);
        }
    }, [setNodes, setEdges, nodes, edges, past]);

    const redo = useCallback(() => {
        const futureState = future[future.length - 1];

        if (futureState) {
            setFuture((future) => future.slice(0, future.length - 1));
            setPast((past) => [...past, { nodes, edges }]);
            setNodes(futureState.nodes);
            setEdges(futureState.edges);
        }
    }, [setNodes, setEdges, nodes, edges, future]);

    // useEffect(() => {
    //     // this effect is used to attach the global event handlers
    //     if (!enableShortcuts) {
    //         return;
    //     }

    //     const keyDownHandler = (event: KeyboardEvent) => {
    //         if (
    //             event.key === 'z' &&
    //             (event.ctrlKey || event.metaKey) &&
    //             event.shiftKey
    //         ) {
    //             redo();
    //         } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
    //             undo();
    //         }
    //     };

    //     document.addEventListener('keydown', keyDownHandler);

    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     };
    // }, [undo, redo, enableShortcuts]);

    return {
        undo,
        redo,
        takeSnapshot,
        canUndo: !past.length,
        canRedo: !future.length,
    };
};

export default useUndoRedo;
