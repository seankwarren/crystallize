/* eslint-disable @typescript-eslint/no-unused-vars */
import { devLog } from '@utils/.';
import { MouseEvent } from 'react';
import { CanvasStore } from '../hooks/types';
import { ActionsListType } from '../types';
import { getSelectedEdges, getSelectedNodes } from '../utils';

const removeElements = (store: CanvasStore) => {
    store.deleteElements(
        getSelectedNodes(store.nodes),
        getSelectedEdges(store.edges)
    );
    devLog('removing elements');
};

const openPalette = (store: CanvasStore) => {
    store.setColorSelectorOpen(true);
    devLog('opened palette');
};
const zoomToSelection = (store: CanvasStore) => {
    store.fitViewToSelection(getSelectedNodes(store.nodes));
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
    const menuPosition = store.project({ x: clientX, y: clientY });
    console.log(menuPosition);
    store.setAlignNodesMenuPosition(menuPosition);
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
        onClick: openAlignNodesMenu,
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
        onClick: openAlignNodesMenu,
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
