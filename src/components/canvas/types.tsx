import { NodeTypes } from '@components/canvas/nodes/nodeTypes';
import { IconName } from '@components/generic/Icon';
import type { FitViewOptions, PanelPosition } from '@reactflow/core';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { EdgeTypes } from './edges';
import { CanvasState } from './hooks/useCanvasState';

type ActionFunction =
    | ((state: CanvasState) => void);

export type ActionType = {
    title: string;
    icon: IconName;
    onClick: ActionFunction
    allowedNodeTypes: NodeTypes[];
    allowedEdgeTypes: EdgeTypes[];
    allowsMixedElements: boolean;
    allowsMultiSelection: boolean;
    requiresMultiSelection: boolean;
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
