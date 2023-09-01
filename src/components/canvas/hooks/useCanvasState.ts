import { useState } from 'react';

import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    applyEdgeChanges as _applyEdgeChanges,
    applyNodeChanges as _applyNodeChanges,
    getConnectedEdges,
    useReactFlow,
} from 'reactflow';
import { ZOOM_DURATION } from '../styles/styles';

export type CanvasState = {
    nodes: Node[];
    selectedNodes: Node[];
    edges: Edge[];
    selectedEdges: Edge[];
    snapToGrid: boolean;
    snapToObjects: boolean;
    isInteractive: boolean;
    zoom: number;
    setNodes: (nodes: Node[]) => Node[];
    setSelectedNodes: (selectedNodes: Node[]) => Node[];
    addNode: (node: Node) => Node[];
    deleteElements: (
        nodes: Node[],
        edges: Edge[]
    ) => { nodes: Node[]; edges: Edge[] };
    applyNodeChanges: (changes: NodeChange[]) => Node[];
    setEdges: (node: Edge[]) => Edge[];
    setSelectedEdges: (selectedEdges: Edge[]) => Edge[];
    addEdge: (node: Edge) => Edge[];
    applyEdgeChanges: (changes: EdgeChange[]) => Edge[];
    onConnect: (params: Edge | Connection) => void;
    fitViewToSelection: (nodes?: Node[]) => void;
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
        selectedNodes: [],
        selectedEdges: [],
        snapToGrid: true,
        snapToObjects: false,
        isInteractive: true,
    };

    const { fitView } = useReactFlow();
    const [canvasState, setCanvasState] = useState<CanvasState>(
        init as CanvasState
    );

    const nodes = canvasState.nodes;
    const selectedNodes = canvasState.nodes.filter((node) => node.selected);
    const setNodes = (nodes: Node[]) => {
        setCanvasState((prev) => {
            return { ...prev, nodes };
        });
        return nodes;
    };
    const setSelectedNodes = (selectedNodes: Node[]) => {
        setCanvasState((prev) => {
            return { ...prev, selectedNodes };
        });
        return selectedNodes;
    };
    const addNode = (node: Node) => {
        setCanvasState((prev) => {
            takeSnapshot(prev);
            return { ...prev, nodes: [...nodes, node] };
        });
        return [...nodes, node];
    };
    const deleteElements = (nodes: Node[], edges: Edge[]) => {
        takeSnapshot(canvasState);
        const nodeIdsToDelete = nodes.map((node) => node.id);
        const updatedNodes = canvasState.nodes.filter(
            (node) => !nodeIdsToDelete.includes(node.id)
        );
        setNodes(updatedNodes);
        const edgeIdsToDelete = edges.map((edge) => edge.id);
        const connectedEdges = getConnectedEdges(nodes, canvasState.edges);
        const updatedEdges = canvasState.edges.filter((edge) => {
            return (
                !edgeIdsToDelete.includes(edge.id) &&
                !connectedEdges.includes(edge)
            );
        });
        setEdges(updatedEdges);
        return { nodes: updatedNodes, edges: updatedEdges };
    };
    const applyNodeChanges = (changes: NodeChange[]) => {
        const updatedNodes = _applyNodeChanges(changes, nodes);
        setNodes(updatedNodes);
        return updatedNodes;
    };

    const edges = canvasState.edges;
    const selectedEdges = canvasState.edges.filter((node) => node.selected);

    const setEdges = (edges: Edge[]) => {
        setCanvasState((prev) => {
            return { ...prev, edges };
        });
        return edges;
    };
    const setSelectedEdges = (selectedEdges: Edge[]) => {
        setCanvasState((prev) => {
            return { ...prev, selectedEdges };
        });
        return selectedEdges;
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

    const fitViewToSelection = (nodes: Node[] = []) => {
        fitView({ duration: ZOOM_DURATION, nodes });
    };

    const onConnect = (params: Edge | Connection): void => {
        let edgeToAdd: Edge;

        if ('id' in params) {
            edgeToAdd = params;
        } else {
            const { source, sourceHandle, target, targetHandle } = params;
            if (!source || !target) return; // connection not completed
            edgeToAdd = {
                id: `${sourceHandle || source}-${targetHandle || target}`,
                source: source,
                target: target,
                sourceHandle: sourceHandle,
                targetHandle: targetHandle,
                type: 'base',
            };
        }

        const updatedEdges = addEdge(edgeToAdd);
        setEdges(updatedEdges);
    };

    return {
        nodes,
        selectedNodes,
        setNodes,
        setSelectedNodes,
        addNode,
        deleteElements,
        applyNodeChanges,
        edges,
        selectedEdges,
        setEdges,
        setSelectedEdges,
        addEdge,
        applyEdgeChanges,
        onConnect,
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive,
        fitViewToSelection,
    };
};

export default useCanvasState;
