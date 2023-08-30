import { useCanvasStore } from '@stores/canvas';
import { useCallback } from 'react';
import { Connection, Edge, EdgeChange, NodeChange } from 'reactflow';

const useEditable = (takeSnapshot: () => void) => {
    const { setEdges, addEdge, applyNodeChanges, applyEdgeChanges } =
        useCanvasStore();

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            applyNodeChanges(changes);
        },
        [applyNodeChanges]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            applyEdgeChanges(changes);
        },
        [applyEdgeChanges]
    );

    const onConnect = useCallback(
        (params: Edge | Connection) => {
            let edgeToAdd: Edge;

            if ('id' in params) {
                edgeToAdd = params;
            } else {
                const { source, sourceHandle, target, targetHandle } = params;
                if (!source || !target) return; // connection not completed
                edgeToAdd = {
                    id: `${source || sourceHandle}-${target || targetHandle}`,
                    source: source,
                    target: target,
                    sourceHandle: sourceHandle,
                    targetHandle: targetHandle,
                };
            }

            const updatedEdges = addEdge(edgeToAdd);
            takeSnapshot();
            setEdges(updatedEdges);
        },
        [addEdge, setEdges, takeSnapshot]
    );

    return { onNodesChange, onEdgesChange, onConnect };
};

export default useEditable;
