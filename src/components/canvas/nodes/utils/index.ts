import { CanvasStore } from '@components/canvas/hooks/useCanvasState';
import {
    defaultCardNodeHeight,
    defaultCardNodeWidth,
    defaultImageNodeHeight,
    defaultImageNodeWidth,
    defaultNoteNodeHeight,
    defaultNoteNodeWidth,
} from '@components/canvas/styles/styles';
import { XYPosition } from 'reactflow';
import { NodeTypes } from '..';

export const getDefaultNodeSize = (nodeType: NodeTypes) => {
    let defaultWidth: number, defaultHeight: number;
    switch (nodeType) {
        case 'card':
            defaultWidth = defaultCardNodeWidth;
            defaultHeight = defaultCardNodeHeight;
            break;
        case 'note':
            defaultWidth = defaultNoteNodeWidth;
            defaultHeight = defaultNoteNodeHeight;
            break;
        case 'image':
            defaultWidth = defaultImageNodeWidth;
            defaultHeight = defaultImageNodeHeight;
            break;
        default:
            console.warn('dragging node of unknown type');
            defaultWidth = defaultCardNodeWidth;
            defaultHeight = defaultCardNodeHeight;
            break;
    }
    return { width: defaultWidth, height: defaultHeight };
};

export const getCenterNodeOnCoords = (
    nodeType: NodeTypes,
    position: { x: number; y: number },
    store: CanvasStore
): XYPosition => {
    if (!store.canvasRef.current) {
        console.warn('canvas ref not set');
        return { x: 0, y: 0 };
    }

    const reactFlowBounds = store.canvasRef.current.getBoundingClientRect();

    const { width: defaultWidth, height: defaultHeight } =
        getDefaultNodeSize(nodeType);

    return store.project({
        x: position.x - reactFlowBounds.left - defaultWidth / 2,
        y: position.y - reactFlowBounds.top - defaultHeight / 2,
    });
};
