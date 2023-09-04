/* eslint-disable @typescript-eslint/no-unused-vars */
import { devLog } from '@utils/.';
// import { getRectOfNodes } from 'src/utils/utils';
import { CanvasState } from '../hooks/useCanvasState';
import { ActionsListType } from '../types';

const removeElements = (state: CanvasState) => {
    state.deleteElements(state.getSelectedNodes(), state.getSelectedEdges());
    devLog('removing elements');
};

const openPalette = (state: CanvasState) => {
    state.setColorSelectorOpen(true);
    devLog('opened palette');
};
const zoomToSelection = (state: CanvasState) => {
    state.fitViewToSelection(state.getSelectedNodes());
    return;
};
const editLineDirection = (_state: CanvasState) => {
    devLog('editing line direction');
};
const editNode = (_state: CanvasState) => {
    devLog('editing node');
};
const editLabel = (_state: CanvasState) => {
    devLog('editing label');
};
const createGroup = (_state: CanvasState) => {
    devLog('creating group');
};
const alignNodes = (_state: CanvasState) => {
    devLog('aligning children');
};
const setBackground = (_state: CanvasState) => {
    devLog('setting background');
};

export const TOOLBAR_ACTIONS: ActionsListType = {
    removeElements: {
        title: 'Delete',
        icon: 'Trash2',
        onClick: removeElements,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        isEditAction: true,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: false,
        preventClickPropagation: true,
    },
    setColor: {
        title: 'Set color',
        icon: 'Palette',
        onClick: openPalette,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        isEditAction: true,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: false,
    },
    zoomToSelection: {
        title: 'Zoom to selection',
        icon: 'Frame',
        onClick: zoomToSelection,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        isEditAction: false,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: false,
        preventClickPropagation: true,
    },
    editLineDirection: {
        title: 'Line direction',
        icon: 'ArrowRight',
        onClick: editLineDirection,
        allowedNodeTypes: [],
        allowedEdgeTypes: ['base'],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: true,
    },
    alignChildren: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: alignNodes,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: true,
    },
    alignSelection: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: alignNodes,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: true,
        requiresSingleType: false,
        preventClickPropagation: true,
    },
    createGroup: {
        title: 'Create group',
        icon: 'Group',
        onClick: createGroup,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: true,
        requiresSingleType: false,
        preventClickPropagation: true,
    },
    editNode: {
        title: 'Edit',
        icon: 'PenSquare',
        onClick: editNode,
        allowedNodeTypes: ['note', 'card'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: true,
    },
    editLabel: {
        title: 'Edit label',
        icon: 'PenSquare',
        onClick: editLabel,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: ['base'],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: true,
    },
    setBackground: {
        title: 'Set background',
        icon: 'Image',
        onClick: setBackground,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        preventClickPropagation: true,
    },
};
