/**
 * Represents the state, and state manipulating functions of a canvas.
 */

import { RefObject } from 'react';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    ViewportHelperFunctions,
    XYPosition,
} from 'reactflow';
import { NodeTypes } from '../nodes';
import { ColorType, EdgeData, NodeData } from '../types';

export type CanvasState = {
    nodes: Node<NodeData, NodeTypes>[];
    edges: Edge<EdgeData>[];
    snapToGrid: boolean;
    snapToObjects: boolean;
    isInteractive: boolean;
    colorSelectorOpen: boolean;
    alignNodesMenuOpen: boolean;
    alignNodesMenuPosition: XYPosition;
};

export type CanvasStore = CanvasState & {
    canvasRef: RefObject<HTMLDivElement>;

    setNodes: React.Dispatch<React.SetStateAction<Node<NodeData, NodeTypes>[]>>;
    getNode: (id: string) => Node<NodeData, NodeTypes> | undefined;
    addNode: (node: Node<NodeData, NodeTypes>) => void;
    addNodes: (nodes: Node<NodeData, NodeTypes>[]) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    updateNode: (nodeId: string, changes: NodeChange[]) => void;
    // getSelectedNodes: (nodes: Node[]) => Node[];
    setSelectedNodes: (selectedNodes: Node[]) => void;
    alignNodesVertical: (direction: 'left' | 'right' | 'center') => void;
    alignNodesHorizontal: (direction: 'top' | 'bottom' | 'middle') => void;

    setEdges: React.Dispatch<React.SetStateAction<Edge<EdgeData>[]>>;
    getEdge: (id: string) => Edge<EdgeData> | undefined;
    addEdge: (edge: Edge<EdgeData>) => void;
    addEdges: (edges: Edge<EdgeData>[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    updateEdge: (edgeId: string, changes: EdgeChange[]) => void;
    // getSelectedEdges: (edges: Edge[]) => Edge[];
    setSelectedEdges: (selectedEdges: Edge[]) => void;

    deleteElements: (nodes: Node[], edges: Edge[]) => void;
    onConnect: (params: Edge | Connection) => void;

    fitViewToSelection: (nodes?: Node<NodeData, NodeTypes>[]) => void;

    toggleSnapToGrid: () => void;
    toggleSnapToObjects: () => void;
    toggleIsInteractive: () => void;

    setColorSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setColors: (
        color: ColorType,
        selectedNodes: Node<NodeData, NodeTypes>[],
        selectedEdges: Edge[]
    ) => void;

    setAlignNodesMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAlignNodesMenuPosition: React.Dispatch<React.SetStateAction<XYPosition>>;
} & ViewportHelperFunctions;
