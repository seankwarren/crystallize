/* eslint-disable @typescript-eslint/no-unused-vars */
import { devLog } from '@utils/.';
// import { getRectOfNodes } from 'src/utils/utils';
import { MouseEvent } from 'react';
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
const openAlignNodesMenu = (store: CanvasStore, e: MouseEvent) => {
    const { clientX, clientY } = e;
    store.setAlignNodesMenuOpen(true);
    // TODO: fix this positioning
    const menuPostition = store.project({ x: clientX, y: clientY });
    const { x, y, zoom } = store.getViewport();
    store.setAlignNodesMenuPosition({
        top: menuPostition.y * zoom,
        left: menuPostition.x * zoom,
    });
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
        allowClickPropagation: true,
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
        allowClickPropagation: false,
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
        allowClickPropagation: true,
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
        allowClickPropagation: true,
    },
    alignChildren: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: (store, e) => {
            openAlignNodesMenu(store, e);
        },
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
        allowClickPropagation: true,
    },
    alignSelection: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: (store, e) => {
            openAlignNodesMenu(store, e);
        },
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: [],
        isEditAction: true,
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: true,
        requiresSingleType: false,
        allowClickPropagation: false,
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
        allowClickPropagation: true,
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
        allowClickPropagation: true,
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
        allowClickPropagation: true,
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
        allowClickPropagation: true,
    },
};
