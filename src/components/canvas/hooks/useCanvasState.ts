import { useState } from 'react';

import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    applyEdgeChanges as _applyEdgeChanges,
    applyNodeChanges as _applyNodeChanges,
} from 'reactflow';

export type CanvasState = {
    nodes: Node[];
    edges: Edge[];
    snapToGrid: boolean;
    snapToObjects: boolean;
    isInteractive: boolean;
    setNodes: (nodes: Node[]) => Node[];
    addNode: (node: Node) => Node[];
    applyNodeChanges: (changes: NodeChange[]) => Node[];
    setEdges: (node: Edge[]) => Edge[];
    addEdge: (node: Edge) => Edge[];
    applyEdgeChanges: (changes: EdgeChange[]) => Edge[];
    onConnect: (params: Edge | Connection) => void;
    toggleSnapToGrid: () => void;
    toggleSnapToObjects: () => void;
    toggleIsInteractive: () => void;
};

type Props = {
    initialState?: CanvasState;
    takeSnapshot: (state: CanvasState) => void;
};

const useCanvasState = ({ initialState, takeSnapshot }: Props): CanvasState => {
    const init = initialState || {
        nodes: [],
        edges: [],
        snapToGrid: true,
        snapToObjects: false,
        isInteractive: true,
    };

    const [canvasState, setCanvasState] = useState<CanvasState>(
        init as CanvasState
    );

    const nodes = canvasState.nodes;
    const setNodes = (nodes: Node[]) => {
        setCanvasState((prev) => {
            // takeSnapshot({ ...prev, nodes });
            return { ...prev, nodes };
        });
        return nodes;
    };
    const addNode = (node: Node) => {
        takeSnapshot(canvasState);
        setCanvasState((prev) => {
            takeSnapshot({ ...prev, nodes: [...nodes, node] });
            return { ...prev, nodes: [...nodes, node] };
        });
        return [...nodes, node];
    };
    const applyNodeChanges = (changes: NodeChange[]) => {
        const updatedNodes = _applyNodeChanges(changes, nodes);
        setNodes(updatedNodes);
        return updatedNodes;
    };

    const edges = canvasState.edges;
    const setEdges = (edges: Edge[]) => {
        setCanvasState((prev) => {
            // takeSnapshot(prev);
            return { ...prev, edges };
        });
        return edges;
    };
    const addEdge = (edge: Edge) => {
        setCanvasState((prev) => {
            takeSnapshot(prev);
            return { ...prev, edges: [...prev.edges, edge] };
        });
        return [...edges, edge];
    };

    const applyEdgeChanges = (changes: EdgeChange[]) => {
        const updatedEdges = _applyEdgeChanges(changes, edges);
        setEdges(updatedEdges);
        return updatedEdges;
    };

    const snapToGrid = canvasState.snapToGrid;
    const toggleSnapToGrid = () => {
        setCanvasState((prev) => ({ ...prev, snapToGrid: !prev.snapToGrid }));
    };

    const snapToObjects = canvasState.snapToObjects;
    const toggleSnapToObjects = () => {
        setCanvasState((prev) => ({
            ...prev,
            snapToObjects: !prev.snapToObjects,
        }));
    };

    const isInteractive = canvasState.isInteractive;
    const toggleIsInteractive = () => {
        setCanvasState((prev) => ({
            ...prev,
            isInteractive: !prev.isInteractive,
        }));
    };

    const onConnect = (params: Edge | Connection): void => {
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
        setEdges(updatedEdges);
    };

    return {
        nodes,
        setNodes,
        addNode,
        applyNodeChanges,
        edges,
        setEdges,
        addEdge,
        applyEdgeChanges,
        onConnect,
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive,
    };
};

export default useCanvasState;
