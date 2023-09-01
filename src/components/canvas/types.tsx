import { NodeTypes } from '@components/canvas/nodes/nodeTypes';
import { IconName } from '@components/generic/Icon';
import type { FitViewOptions, PanelPosition } from '@reactflow/core';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { EdgeTypes } from './edges';
import { CanvasState } from './hooks/useCanvasState';

type ActionFunction =
    | ((state: CanvasState) => void);

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
