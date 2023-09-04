/* eslint-disable @typescript-eslint/no-unused-vars */
import { devLog } from '@utils/.';
// import { getRectOfNodes } from 'src/utils/utils';
import { CanvasStore } from '../hooks/useCanvasState';
import { ActionsListType } from '../types';

const removeElements = (store: CanvasStore) => {
    store.deleteElements(store.getSelectedNodes(), store.getSelectedEdges());
    devLog('removing elements');
};

const openPalette = (store: CanvasStore) => {
    store.setColorSelectorOpen(true);
    devLog('opened palette');
};
const zoomToSelection = (store: CanvasStore) => {
    store.fitViewToSelection(store.getSelectedNodes());
    return;
};
const editLineDirection = (_store: CanvasStore) => {
    devLog('editing line direction');
};
const editNode = (_store: CanvasStore) => {
    devLog('editing node');
};
const editLabel = (_store: CanvasStore) => {
    devLog('editing label');
};
const createGroup = (_store: CanvasStore) => {
    devLog('creating group');
};
const alignNodes = (_store: CanvasStore) => {
    devLog('aligning children');
};
const setBackground = (_store: CanvasStore) => {
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
