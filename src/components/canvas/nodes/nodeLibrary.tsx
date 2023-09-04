import { Node } from 'reactflow';

export const draggingCardNode: Node = {
    id: 'dragging-card',
    type: 'dragging',
    data: {},
    dragging: true,
    selected: false,
    position: { x: 0, y: 0 },
};

export const introNode: Node = {
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
