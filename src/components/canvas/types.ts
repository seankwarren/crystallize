import { NodeTypes } from '@components/canvas/nodes/nodeTypes';
import { IconName } from '@components/generic/Icon';
import type { FitViewOptions, PanelPosition } from '@reactflow/core';
import type {
    ButtonHTMLAttributes,
    CSSProperties,
    HTMLAttributes,
    ReactNode,
} from 'react';
import {
    Connection,
    CoordinateExtent,
    EdgeMarkerType,
    EdgeUpdatable,
    HandleType,
    NodeHandleBounds,
    Position,
    XYPosition,
    internalsSymbol,
} from 'reactflow';
import { EdgeTypes } from './edges';
import { CanvasState } from './hooks/useCanvasState';

type ActionFunction = (state: CanvasState) => void;

export type ActionType = {
    /** Tooltip text for the action. */
    title: string;
    /** The name of the lucide icon to be used. */
    icon: IconName;
    /** Function to call when the action is clicked. */
    onClick: ActionFunction;
    /** Array of node types where this action is allowed. */
    allowedNodeTypes: NodeTypes[];
    /** Array of edge types where this action is allowed. */
    allowedEdgeTypes: EdgeTypes[];
    /** Indicates if this action is an edit action. */
    isEditAction: boolean;
    /**
     * Specifies if the action can be used with a mixed selection
     * of elements (i.e., nodes and edges).
     */
    allowsMixedElements: boolean;
    /**
     * Specifies if the action can be used when multiple elements are selected.
     */
    allowsMultiSelection: boolean;
    /**
     * Specifies if the action requires multiple elements to be selected
     * for it to be available.
     */
    requiresMultiSelection: boolean;
    /**
     * Specifies if the action requires a single type of element to be selected
     * (i.e., all elements must be of type 'card').
     */
    requiresSingleType: boolean;
};

export type ActionsListType = {
    [key: string]: ActionType;
};

export type ControlProps = HTMLAttributes<HTMLDivElement> & {
    fitViewOptions?: FitViewOptions;
    onInteractiveChange?: (interactiveStatus: boolean) => void;
    position?: PanelPosition;
};

export type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type Transform = [number, number, number];

export interface NodeData {
    color: string;
    label?: string;
}

export interface EdgeData {
    color: string;
    label?: string;
}

export type Node<
    T = NodeData,
    U extends string | undefined = string | undefined
> = {
    id: string;
    position: XYPosition;
    data: T;
    type?: U;
    style?: CSSProperties;
    className?: string;
    sourcePosition?: Position;
    targetPosition?: Position;
    hidden?: boolean;
    selected?: boolean;
    dragging?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    connectable?: boolean;
    deletable?: boolean;
    dragHandle?: string;
    width?: number | null;
    height?: number | null;
    parentNode?: string;
    zIndex?: number;
    extent?: 'parent' | CoordinateExtent;
    expandParent?: boolean;
    positionAbsolute?: XYPosition;
    ariaLabel?: string;
    focusable?: boolean;
    resizing?: boolean;
    [internalsSymbol]?: {
        z?: number;
        handleBounds?: NodeHandleBounds;
        isParent?: boolean;
    };
};

type EdgeLabelOptions = {
    label?: string | ReactNode;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
};

export type Edge = {
    id: string;
    type?: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    style?: CSSProperties;
    animated?: boolean;
    hidden?: boolean;
    deletable?: boolean;
    data?: EdgeData;
    className?: string;
    sourceNode?: Node;
    targetNode?: Node;
    selected?: boolean;
    markerStart?: EdgeMarkerType;
    markerEnd?: EdgeMarkerType;
    zIndex?: number;
    ariaLabel?: string;
    interactionWidth?: number;
    focusable?: boolean;
    updatable?: EdgeUpdatable;
} & EdgeLabelOptions;

export type ConnectionHandle = {
    id: string | null;
    type: HandleType | null;
    nodeId: string;
    x: number;
    y: number;
};

export type ValidConnectionFunc = (connection: Connection) => boolean;
