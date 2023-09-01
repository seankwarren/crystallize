/* eslint-disable @typescript-eslint/no-unused-vars */
import { devLog } from '@utils/.';
// import { getRectOfNodes } from 'src/utils/utils';
import { Node } from 'reactflow';
import { CanvasState } from '../hooks/useCanvasState';
import { ActionsListType } from '../types';

const removeElements = (state: CanvasState) => {
    state.deleteElements(state.selectedNodes, state.selectedEdges);
    console.log(state);
    devLog('removing elements');
};

const openPalette = (_state: CanvasState) => {
    devLog('opening palette');
};
const zoomToSelection = (state: CanvasState) => {
    if (state.selectedNodes.length > 0) {
        state.fitViewToSelection(state.selectedNodes);
    } else if (state.selectedEdges.length > 0) {
        // iterate over all selected adges and build array of edge.sourceNode and edge.targetNode without duplicates
        const nodes = state.selectedEdges.reduce<Node[]>((acc, edge) => {
            const sourceNode = state.nodes.find(
                (n) => n.id === edge.source
            ) as Node;
            const targetNode: Node = state.nodes.find(
                (n) => n.id === edge.target
            ) as Node;
            if (!acc.includes(sourceNode)) {
                acc.push(sourceNode);
            }
            if (!acc.includes(targetNode)) {
                acc.push(targetNode);
            }
            return acc;
        }, []);

        // state.selectedEdges;
        console.log(nodes);
        state.fitViewToSelection(nodes);
    }
    devLog('zooming to selection');
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
        icon: 'Trash',
        onClick: removeElements,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: false,
    },
    setColor: {
        title: 'Set color',
        icon: 'Palette',
        onClick: openPalette,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
    zoomToSelection: {
        title: 'Zoom to selection',
        icon: 'Frame',
        onClick: zoomToSelection,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: ['base'],
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: false,
    },
    editLineDirection: {
        title: 'Line direction',
        icon: 'ArrowRight',
        onClick: editLineDirection,
        allowedNodeTypes: [],
        allowedEdgeTypes: ['base'],
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
    alignChildren: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: alignNodes,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: [],
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
    alignSelection: {
        title: 'Align',
        icon: 'AlignStartVertical',
        onClick: alignNodes,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: [],
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: true,
        requiresSingleType: false,
    },
    createGroup: {
        title: 'Create group',
        icon: 'Group',
        onClick: createGroup,
        allowedNodeTypes: ['note', 'card', 'image', 'group'],
        allowedEdgeTypes: [],
        allowsMixedElements: true,
        allowsMultiSelection: true,
        requiresMultiSelection: true,
        requiresSingleType: false,
    },
    editNode: {
        title: 'Edit',
        icon: 'PenSquare',
        onClick: editNode,
        allowedNodeTypes: ['note', 'card'],
        allowedEdgeTypes: [],
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
    editLabel: {
        title: 'Edit label',
        icon: 'PenSquare',
        onClick: editLabel,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: ['base'],
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
    setBackground: {
        title: 'Set background',
        icon: 'Image',
        onClick: setBackground,
        allowedNodeTypes: ['group'],
        allowedEdgeTypes: [],
        allowsMixedElements: false,
        allowsMultiSelection: true,
        requiresMultiSelection: false,
        requiresSingleType: true,
    },
};
