import { Node } from 'reactflow';
import { ActionType, ActionsListType } from '../actions';
import { NodeTypes } from './nodeTypes';

const removeNode = (node: Node) => {
    console.log(`removing node`, node);
};
const openPalette = (node: Node) => {
    console.log(`opening palette`, node);
};
const zoomToSelection = (node: Node) => {
    console.log(`zooming to selection`, node);
};
const editNode = (node: Node) => {
    console.log(`editing node`, node);
};
const editLabel = (node: Node) => {
    console.log(`editing label`, node);
};
const alignChildren = (node: Node) => {
    console.log(`aligning children`, node);
};
const setBackground = (node: Node) => {
    console.log(`setting background`, node);
};

type NodeActions = {
    removeNode: ActionType<Node>;
    setColor: ActionType<Node>;
    zoomToSelection: ActionType<Node>;
    alignChildren: ActionType<Node>;
    editNode: ActionType<Node>;
    editLabel: ActionType<Node>;
    setBackground: ActionType<Node>;
};

const NODE_ACTIONS: NodeActions = {
    removeNode: {
        icon: 'Trash',
        onClick: removeNode,
        allowedTypes: ['note', 'card', 'image', 'group'],
    },
    setColor: {
        icon: 'Palette',
        onClick: openPalette,
        allowedTypes: ['note', 'card', 'image', 'group'],
    },
    zoomToSelection: {
        icon: 'Frame',
        onClick: zoomToSelection,
        allowedTypes: ['note', 'card', 'image', 'group'],
    },
    alignChildren: {
        icon: 'AlignStartVertical',
        onClick: alignChildren,
        allowedTypes: ['group'],
    },
    editNode: {
        icon: 'PenSquare',
        onClick: editNode,
        allowedTypes: ['note', 'card'],
    },
    editLabel: {
        icon: 'PenSquare',
        onClick: editLabel,
        allowedTypes: ['group'],
    },
    setBackground: {
        icon: 'Image',
        onClick: setBackground,
        allowedTypes: ['group'],
    },
};

export const nodeActionsByType = (type: NodeTypes): ActionsListType<Node> => {
    const filteredActions = Object.entries(NODE_ACTIONS).filter(([, action]) =>
        action.allowedTypes.includes(type)
    );
    return Object.fromEntries(filteredActions);
};
