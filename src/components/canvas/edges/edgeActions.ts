import { ActionType, ActionsListType } from '@components/canvas/types';
import { Edge } from 'reactflow';
import { EdgeTypes } from './edgeTypes';

type EdgeActions = {
    remove: ActionType<Edge>;
    setColor: ActionType<Edge>;
    zoomToSelection: ActionType<Edge>;
    editLineDirection: ActionType<Edge>;
    editLabel: ActionType<Edge>;
};

const removeEdge = (edge: Edge) => {
    console.log('removing node', edge);
};
const openPalette = (edge: Edge) => {
    console.log('opening palette', edge);
};
const zoomToSelection = (edge: Edge) => {
    console.log('zooming to selection', edge);
};
const editLineDirection = (edge: Edge) => {
    console.log('editing line direction', edge);
};
const editLabel = (edge: Edge) => {
    console.log('editing label', edge);
};

const EDGE_ACTIONS: EdgeActions = {
    remove: {
        icon: 'Trash',
        onClick: removeEdge,
        allowedTypes: ['base'],
    },
    setColor: {
        icon: 'Palette',
        onClick: openPalette,
        allowedTypes: ['base'],
    },
    zoomToSelection: {
        icon: 'Frame',
        onClick: zoomToSelection,
        allowedTypes: ['base'],
    },
    editLineDirection: {
        icon: 'ArrowRight',
        onClick: editLineDirection,
        allowedTypes: ['base'],
    },
    editLabel: {
        icon: 'PenSquare',
        onClick: editLabel,
        allowedTypes: ['base'],
    },
};

export const edgeActionsByType = (type: EdgeTypes): ActionsListType<Edge> => {
    const filteredActions = Object.entries(EDGE_ACTIONS).filter(([, action]) =>
        action.allowedTypes.includes(type)
    );
    return Object.fromEntries(filteredActions);
};
