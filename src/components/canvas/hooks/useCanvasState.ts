import { RefObject, useRef, useState } from 'react';

import { devLog } from '@utils/.';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    ViewportHelperFunctions,
    applyEdgeChanges,
    applyNodeChanges,
    getConnectedEdges,
    useReactFlow,
} from 'reactflow';
import { ZOOM_DURATION } from '../styles/styles';
import { ColorType, EdgeData, NodeData } from '../types';
import { HistoryItem } from './useUndoRedo';

/**
 * Represents the state, and state manipulating functions of a canvas.
 */

export type CanvasState = {
    nodes: Node<NodeData>[];
    edges: Edge<EdgeData>[];
    snapToGrid: boolean;
    snapToObjects: boolean;
    isInteractive: boolean;
    colorSelectorOpen: boolean;
};

export type CanvasStore = CanvasState & {
    // reactFlowInstance: ReactFlowInstance<NodeData, EdgeData>;
    canvasRef: RefObject<HTMLDivElement>;

    setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
    getNode: (id: string) => Node<NodeData> | undefined;
    addNode: (node: Node<NodeData>) => void;
    addNodes: (nodes: Node<NodeData>[]) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    updateNode: (nodeId: string, changes: NodeChange[]) => void;
    getSelectedNodes: () => Node<NodeData>[];
    setSelectedNodes: (selectedNodes: Node<NodeData>[]) => void;

    setEdges: React.Dispatch<React.SetStateAction<Edge<EdgeData>[]>>;
    getEdge: (id: string) => Edge<EdgeData> | undefined;
    addEdge: (edge: Edge<EdgeData>) => void;
    addEdges: (edges: Edge<EdgeData>[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    updateEdge: (edgeId: string, changes: EdgeChange[]) => void;
    getSelectedEdges: () => Edge[];
    setSelectedEdges: (selectedEdges: Edge[]) => void;

    deleteElements: (nodes: Node[], edges: Edge[]) => void;
    onConnect: (params: Edge | Connection) => void;

    fitViewToSelection: (nodes?: Node[]) => void;

    toggleSnapToGrid: () => void;
    toggleSnapToObjects: () => void;
    toggleIsInteractive: () => void;

    setColorSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setColors: (
        color: ColorType,
        selectedNodes: Node[],
        selectedEdges: Edge[]
    ) => void;
} & ViewportHelperFunctions;

type Props = {
    initialState?: CanvasState;
    takeSnapshot: (state: HistoryItem) => void;
};

/**
 * A React hook to store the state and state manipulators of a canvas.
 *
 * @param props.initialState - The initial state of the canvas.
 * @param props.takeSnapshot - A function to take a snapshot of the canvas state.
 *
 * @returns The current canvas state along with various functions to manipulate it.
 */
const useCanvasState = ({ initialState, takeSnapshot }: Props): CanvasStore => {
    initialState = {
        nodes: [],
        edges: [],
        snapToGrid: true,
        snapToObjects: false,
        isInteractive: true,
        colorSelectorOpen: false,
    };

    const reactFlowInstance = useReactFlow<NodeData, EdgeData>();
    const canvasRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node<NodeData>[]>(initialState.nodes);
    const [edges, setEdges] = useState<Edge<EdgeData>[]>(initialState.edges);

    const addNodes = (nodes: Node<NodeData>[]) => {
        setNodes((prev) => [...prev, ...nodes]);
    };

    const addNode = (node: Node) => {
        // takeSnapshot(canvasState);
        addNodes([node]);
    };

    const getNode = (id: string) => nodes.find((node) => node.id === id);

    const updateNode = (nodeId: string, changes: NodeChange[]) => {
        const originalNode = getNode(nodeId);
        if (!originalNode) {
            console.error(`Node with id ${nodeId} not found`);
            return;
        }
        // takeSnapshot(canvasState);
        reactFlowInstance.setNodes(() => {
            return applyNodeChanges(changes, [originalNode]);
        });
    };

    const onNodesChange = (changes: NodeChange[]) => {
        setNodes((nodes) => {
            const changedNodes = applyNodeChanges(changes, nodes);
            const updatedNodes = nodes.map((node) => {
                const changedNode = changedNodes.find(
                    (updatedNode) => updatedNode.id === node.id
                );
                if (changedNode) return changedNode;
                return node;
            });
            return updatedNodes;
        });
    };

    const getSelectedNodes = () => nodes.filter((node) => node.selected);

    const setSelectedNodes = (selectedNodes: Node[]) => {
        const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
        setNodes((nodes) => {
            return nodes.map((node) => {
                return { ...node, selected: selectedNodeIds.has(node.id) };
            });
        });
    };

    const addEdges = (edges: Edge<EdgeData>[]) => {
        setEdges((prev) => [...prev, ...edges]);
    };

    const addEdge = (edge: Edge) => {
        takeSnapshot({ nodes, edges });
        addEdges([edge]);
    };
    const getEdge = (id: string) => edges.find((edge) => edge.id === id);

    const updateEdge = (edgeId: string, changes: EdgeChange[]) => {
        const originalEdge = getEdge(edgeId);
        if (!originalEdge) {
            console.error(`Node with id ${edgeId} not found`);
            return;
        }
        setEdges(() => {
            return applyEdgeChanges(changes, [originalEdge]);
        });
    };

    const onEdgesChange = (changes: EdgeChange[]) => {
        setEdges((edges) => {
            return applyEdgeChanges(changes, edges);
        });
    };

    const getSelectedEdges = () => edges.filter((node) => node.selected);

    const setSelectedEdges = (selectedEdges: Edge[]) => {
        const selectedEdgeIds = new Set(selectedEdges.map((n) => n.id));
        setEdges((edges) => {
            return edges.map((edge) => {
                return { ...edge, selected: selectedEdgeIds.has(edge.id) };
            });
        });
    };

    const deleteElements = (nodes: Node[], edges: Edge[]) => {
        if (nodes.length === 0 && edges.length === 0) return;
        // takeSnapshot({ nodes, edges });
        setEdges((prev) => {
            const edgesToDelete =
                nodes.length === 0
                    ? edges
                    : [...edges, ...getConnectedEdges(nodes, prev)];
            return prev.filter((edge) => !edgesToDelete.includes(edge));
        });
        setNodes((prev) => {
            const nodesToDelete = nodes;
            return prev.filter((node) => !nodesToDelete.includes(node));
        });
    };

    const fitViewToSelection = (nodes: Node[] = [], edges: Edge[] = []) => {
        if (nodes.length === 0 && edges.length === 0) {
            reactFlowInstance.fitView({
                duration: ZOOM_DURATION,
                nodes,
            });
            devLog('zoomed to all nodes');
            return;
        }
        if (nodes.length > 0) {
            reactFlowInstance.fitView({ duration: ZOOM_DURATION, nodes });
            devLog('zooming to selected nodes');
            return;
        }
        if (edges.length > 0) {
            const nodes = edges.reduce<Node<NodeData>[]>((acc, edge) => {
                const connectedNodes = nodes.find(
                    (n) => n.id === edge.source || n.id === edge.target
                );
                connectedNodes && acc.push(connectedNodes);
                return acc;
            }, []);
            reactFlowInstance.fitView({
                duration: ZOOM_DURATION,
                nodes,
            });
            return;
        }
        return;
    };

    const onConnect = (params: Edge | Connection): void => {
        if ('id' in params) {
            addEdge(params);
        } else {
            const { source, sourceHandle, target, targetHandle } = params;
            if (!source || !target) return; // connection not completed
            const edgeToAdd = {
                id: `${sourceHandle || source}-${targetHandle || target}`,
                source: source,
                target: target,
                sourceHandle: sourceHandle,
                targetHandle: targetHandle,
                type: 'base',
                data: { color: '' },
            };
            takeSnapshot({ nodes, edges });
            addEdge(edgeToAdd);
        }
    };

    const [snapToGrid, setSnapToGrid] = useState<boolean>(
        initialState.snapToGrid
    );
    const toggleSnapToGrid = () => {
        setSnapToGrid((prev) => !prev);
    };

    const [snapToObjects, setSnapToObjects] = useState<boolean>(
        initialState.snapToObjects
    );
    const toggleSnapToObjects = () => {
        setSnapToObjects((prev) => !prev);
    };

    const [isInteractive, setIsInteractive] = useState<boolean>(
        initialState.isInteractive
    );
    const toggleIsInteractive = () => {
        setIsInteractive((prev) => !prev);
    };

    // TODO: move to local state of toolbar
    const [colorSelectorOpen, setColorSelectorOpen] = useState<boolean>(
        initialState.colorSelectorOpen
    );

    const setColors = (
        color: ColorType,
        selectedNodes: Node[],
        selectedEdges: Edge[]
    ): void => {
        if (selectedNodes.length === 0 && selectedEdges.length === 0) return;

        const selectedEdgeIds = new Set(selectedEdges.map((e) => e.id));

        takeSnapshot({ nodes, edges });
        setNodes((prev) => {
            return prev.map((node) => {
                const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
                if (selectedNodeIds.has(node.id)) {
                    const newData: NodeData = {
                        ...node.data,
                        color: color,
                    };
                    return { ...node, ...{ data: newData } };
                }
                return node; // return the node as-is if not selected
            });
        });
        setEdges((prev) => {
            return prev.map((edge) => {
                if (selectedEdgeIds.has(edge.id)) {
                    const newData: EdgeData = {
                        ...(edge.data as EdgeData),
                        color: color,
                    };
                    return { ...edge, ...{ data: newData } };
                }
                return edge; // return the edge as-is if not selected
            });
        });
    };

    return {
        ...reactFlowInstance,
        canvasRef,

        nodes,
        getNode,
        setNodes,
        addNode,
        addNodes,
        updateNode,
        onNodesChange,
        getSelectedNodes,
        setSelectedNodes,

        edges,
        getEdge,
        setEdges,
        addEdge,
        addEdges,
        updateEdge,
        onEdgesChange,
        getSelectedEdges,
        setSelectedEdges,

        deleteElements,
        onConnect,

        fitViewToSelection,

        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive,

        setColors,
        colorSelectorOpen,
        setColorSelectorOpen,
    };
};

export default useCanvasState;
