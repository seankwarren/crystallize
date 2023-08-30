import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    applyEdgeChanges,
    applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';

type CanvasState = {
    nodes: Node[];
    setNodes: (nodes: Node[]) => Node[];
    addNode: (node: Node) => Node[];
    applyNodeChanges: (changes: NodeChange[]) => Node[];
    edges: Edge[];
    setEdges: (node: Edge[]) => Edge[];
    addEdge: (node: Edge) => Edge[];
    applyEdgeChanges: (changes: EdgeChange[]) => Edge[];
    snapToGrid: boolean;
    toggleSnapToGrid: () => void;
    snapToObjects: boolean;
    toggleSnapToObjects: () => void;
    defaultZoom: number;
    isInteractive: boolean;
    toggleIsInteractive: () => void;
    nodesDraggable: boolean;
    nodesConnectable: boolean;
};

export const useCanvasStore = create<CanvasState>()((set, get) => ({
    nodes: [],
    setNodes: (nodes) => {
        set(() => ({ nodes }));
        return nodes;
    },
    addNode: (node) => {
        const updatedNodes = [...get().nodes, node];
        set(() => ({ nodes: updatedNodes }));
        return updatedNodes;
    },
    applyNodeChanges: (changes) => {
        const updatedNodes = applyNodeChanges(changes, get().nodes);
        set(() => ({ nodes: updatedNodes }));
        return updatedNodes;
    },
    edges: [],
    setEdges: (edges: Edge[]) => {
        set(() => ({ edges }));
        return edges;
    },
    addEdge: (edge) => {
        const updatedEdges = [...get().edges, edge];
        set(() => ({ edges: updatedEdges }));
        return updatedEdges;
    },
    applyEdgeChanges: (changes) => {
        const updatedEdges = applyEdgeChanges(changes, get().edges);
        set(() => ({ edges: updatedEdges }));
        return updatedEdges;
    },
    snapToGrid: true,
    toggleSnapToGrid: () => {
        console.log('toggleSnapToGrid');
        set((s) => ({
            snapToGrid: !s.snapToGrid,
        }));
    },
    snapToObjects: false,
    toggleSnapToObjects: () => {
        set((s) => ({
            snapToObjects: !s.snapToObjects,
        }));
    },
    defaultZoom: 1,
    isInteractive: true,
    toggleIsInteractive: () => {
        set((s) => ({
            isInteractive: !s.isInteractive,
            nodesDraggable: !s.nodesDraggable,
            nodesConnectable: !s.nodesConnectable,
        }));
    },
    nodesDraggable: true,
    nodesConnectable: true,
}));
