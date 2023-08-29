import { EdgeTypes } from 'components/canvas/edges/edgeTypes';
import { NodeTypes } from 'components/canvas/nodes/nodeTypes';
import { IconName } from 'components/generic/Icon';
import { Edge, Node } from 'reactflow';

export type ActionType<T extends Node | Edge> = {
    icon: IconName;
    onClick: (element: T) => void;
    allowedTypes: (NodeTypes | EdgeTypes)[];
};

export type ActionsListType<T extends Node | Edge> = {
    [key: string]: ActionType<T>;
};
