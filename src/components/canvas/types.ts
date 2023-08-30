import { EdgeTypes } from '@components/canvas/edges/edgeTypes';
import { NodeTypes } from '@components/canvas/nodes/nodeTypes';
import { IconName } from '@components/generic/Icon';
import type { FitViewOptions, PanelPosition } from '@reactflow/core';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { Edge, Node } from 'reactflow';

export type ActionType<T extends Node | Edge> = {
    icon: IconName;
    onClick: (element: T) => void;
    allowedTypes: (NodeTypes | EdgeTypes)[];
};

export type ActionsListType<T extends Node | Edge> = {
    [key: string]: ActionType<T>;
};

export type ControlProps = HTMLAttributes<HTMLDivElement> & {
    fitViewOptions?: FitViewOptions;
    onInteractiveChange?: (interactiveStatus: boolean) => void;
    position?: PanelPosition;
};

export type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
