import { devLog } from '@utils/.';
import { useRef, useState } from 'react';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    XYPosition,
    applyEdgeChanges,
    applyNodeChanges,
    getConnectedEdges,
    getRectOfNodes,
    // getRectOfNodes,
    useReactFlow,
} from 'reactflow';
import { NodeTypes } from '../nodes';
import { ZOOM_DURATION } from '../styles/styles';
import { ColorType, EdgeData, NodeData } from '../types';
import { getSelectedNodes } from '../utils';
import { CanvasState, CanvasStore } from './types';
import { HistoryItem } from './useUndoRedo';

type Props = {
    initialState?: CanvasState;
    takeSnapshot: (state: HistoryItem) => void;
    // rfStore: ReactFlowState;
};

/**
 * A React hook to store the state and state manipulators of a canvas.
 *
 * @param props.initialState - The initial state of the canvas.
 * @param props.takeSnapshot - A function to take a snapshot of the canvas state.
 * @param props.rfStore - The react-flow store.
 *
 * @returns The current canvas state along with various functions to manipulate it.
 */
const useCanvasState = ({
    initialState,
    takeSnapshot,
}: // rfStore,
Props): CanvasStore => {
    initialState = initialState || {
        nodes: [],
        edges: [],
        snapToGrid: true,
        snapToObjects: false,
        isInteractive: true,
        colorSelectorOpen: false,
        alignNodesMenuOpen: false,
        alignNodesMenuPosition: { x: 0, y: 0 },
    };

    const reactFlowInstance = useReactFlow<NodeData, EdgeData>();
    const canvasRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node<NodeData, NodeTypes>[]>(
        initialState.nodes
    );
    const [edges, setEdges] = useState<Edge<EdgeData>[]>(initialState.edges);

    const addNodes = (nodes: Node<NodeData, NodeTypes>[]) => {
        setNodes((prev) => [...prev, ...nodes]);
    };

    const addNode = (node: Node<NodeData, NodeTypes>) => {
        // takeSnapshot(canvasState);
        addNodes([node]);
    };

    const getNode = (id: string): Node<NodeData, NodeTypes> | undefined =>
        nodes.find((node) => node.id === id);

    const updateNode = (nodeId: string, changes: NodeChange[]): void => {
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

    const onNodesChange = (changes: NodeChange[]): void => {
        setNodes((nodes) => {
            const changedNodes = applyNodeChanges(changes, nodes);
            const updatedNodes = nodes.map((node) => {
                const changedNode = changedNodes.find(
                    (updatedNode) => updatedNode.id === node.id
                );
                if (changedNode) return changedNode;
                return node;
            });
            return updatedNodes as Node<NodeData, NodeTypes>[];
        });
    };

    const setSelectedNodes = (selectedNodes: Node[]): void => {
        const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
        setNodes((nodes) => {
            return nodes.map((node) => {
                return { ...node, selected: selectedNodeIds.has(node.id) };
            });
        });
    };

    const alignNodesVertical = (direction: 'left' | 'right' | 'center') => {
        setNodes((nodes) => {
            const selectedNodes = getSelectedNodes(nodes);
            if (selectedNodes.length === 0) return nodes;
            const boundingBox = getRectOfNodes(selectedNodes);

            return nodes.map((node) => {
                if (!node.selected) return node;

                let newPosX;

                switch (direction) {
                    case 'left':
                        newPosX = boundingBox.x;
                        break;
                    case 'right':
                        newPosX =
                            boundingBox.x +
                            boundingBox.width -
                            (node.width || 0);
                        break;
                    case 'center':
                        newPosX =
                            boundingBox.x +
                            boundingBox.width / 2 -
                            (node.width || 0) / 2;
                        break;
                    default:
                        console.error('Invalid direction');
                        return node;
                }

                return {
                    ...node,
                    position: {
                        x: newPosX,
                        y: node.position.y,
                    },
                };
            });
        });
    };

    const alignNodesHorizontal = (direction: 'top' | 'bottom' | 'middle') => {
        setNodes((nodes) => {
            const selectedNodes = getSelectedNodes(nodes);
            if (selectedNodes.length === 0) return nodes;
            const boundingBox = getRectOfNodes(selectedNodes);

            return nodes.map((node) => {
                if (!node.selected) return node;

                let newPosY;

                switch (direction) {
                    case 'top':
                        newPosY = boundingBox.y;
                        break;
                    case 'bottom':
                        newPosY =
                            boundingBox.y +
                            boundingBox.height -
                            (node.height || 0);
                        break;
                    case 'middle':
                        newPosY =
                            boundingBox.y +
                            boundingBox.height / 2 -
                            (node.height || 0) / 2;
                        break;
                    default:
                        console.error('Invalid direction');
                        return node;
                }

                return {
                    ...node,
                    position: {
                        x: node.position.x,
                        y: newPosY,
                    },
                };
            });
        });
    };

    const addEdges = (edges: Edge<EdgeData>[]) => {
        setEdges((prev) => [...prev, ...edges]);
    };

    const addEdge = (edge: Edge) => {
        // takeSnapshot({ nodes, edges });
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

    // const getSelectedEdges = (edges: Edge[]) => edges.filter((node) => node.selected);

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
            const nodesIdsToDelete = new Set(nodes.map((n) => n.id));
            return prev.filter((node) => !nodesIdsToDelete.has(node.id));
        });
    };

    const fitViewToSelection = (
        nodes: Node<NodeData, NodeTypes>[] = [],
        edges: Edge[] = []
    ) => {
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
        setNodes((nodes) => {
            const updatedNodes = nodes.map((node) => {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        isResizable: !node.data.isResizable,
                    } as NodeData,
                };
            });
            return updatedNodes;
        });
    };

    // TODO: move to local state of toolbar
    const [colorSelectorOpen, setColorSelectorOpen] = useState<boolean>(
        initialState.colorSelectorOpen
    );

    const setColors = (
        color: ColorType,
        selectedNodes: Node<NodeData, NodeTypes>[],
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

    const [alignNodesMenuOpen, setAlignNodesMenuOpen] = useState<boolean>(
        initialState.alignNodesMenuOpen
    );

    const [alignNodesMenuPosition, setAlignNodesMenuPosition] =
        useState<XYPosition>({ x: 0, y: 0 });

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
        // getSelectedNodes,
        setSelectedNodes,
        alignNodesVertical,
        alignNodesHorizontal,

        edges,
        getEdge,
        setEdges,
        addEdge,
        addEdges,
        updateEdge,
        onEdgesChange,
        // getSelectedEdges,
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
        alignNodesMenuOpen,
        setAlignNodesMenuOpen,
        alignNodesMenuPosition,
        setAlignNodesMenuPosition,
    };
};

export default useCanvasState;
