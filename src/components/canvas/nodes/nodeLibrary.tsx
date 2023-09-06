import { Node } from 'reactflow';
import { NodeTypes } from '.';
import { NodeData } from '../types';

export const draggingCardNode: Node<NodeData, NodeTypes> = {
    id: 'dragging-card',
    type: 'dragging',
    data: {},
    dragging: true,
    selected: false,
    position: { x: 0, y: 0 },
};

export const introNode: Node<NodeData, NodeTypes> = {
    id: 'intro',
    type: 'intro',
    data: {
        color: 'rgb(168, 130, 255)',
        isResizable: false,
        label:
            <>
                <p>
                    Drag from below or double click
                </p>
                <p>
                    Space + Drag to pan
                </p>
                <p>
                    Ctrl + Scroll to zoom
                </p>
            </>
    },
    selected: true,
    draggable: false,
    selectable: false,
    connectable: false,
    position: { x: 0, y: 0 },
};

export const selectionNode: Node<NodeData, NodeTypes> = {
    id: 'selection',
    type: 'selection',
    position: { x: 0, y: 0 },
    hidden: true,
    selectable: false,
    connectable: false,
    draggable: false,
    data: {},
}
