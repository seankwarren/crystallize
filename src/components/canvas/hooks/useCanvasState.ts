import { useState } from 'react';

import {
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
    toggleSnapToGrid: () => void;
    toggleSnapToObjects: () => void;
    toggleIsInteractive: () => void;
};

type Props = {
    initialState?: CanvasState;
};

const useCanvasState = ({ initialState }: Props): CanvasState => {
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
        setCanvasState((prev) => ({ ...prev, nodes }));
        return nodes;
    };
    const addNode = (node: Node) => {
        setCanvasState({
            ...canvasState,
            nodes: [...nodes, node],
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
        setCanvasState((prev) => ({ ...prev, edges }));
        return edges;
    };
    const addEdge = (edge: Edge) => {
        setCanvasState((prev) => ({
            ...prev,
            edges: [...prev.edges, edge],
        }));
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

    return {
        nodes,
        setNodes,
        addNode,
        applyNodeChanges,
        edges,
        setEdges,
        addEdge,
        applyEdgeChanges,
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive,
    };
};

export default useCanvasState;
