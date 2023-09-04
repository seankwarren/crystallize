import { Node } from 'reactflow';

export const initialNodes: Node[] = [
    {
        id: '1',
        type: 'card',
        data: { label: 'Node 1', color: '' },
        position: { x: 0, y: 40 },
        // draggable: true,
    },
    {
        id: '2',
        type: 'card',
        data: { label: 'Node 2', color: '' },
        position: { x: 0, y: -40 },
        // draggable: true,
    },
];

export const draggingCardNode: Node = {
    id: 'dragging-card',
    type: 'card',
    data: { label: 'Node 1', color: 'rgb(168, 130, 255)' },
    dragging: true,
    selected: false,
    position: { x: 0, y: 0 },
};

export const introNode: Node = {
    id: 'intro',
    type: 'card',
    data: {
        color: 'rgb(168, 130, 255)',
        label:
            <>
                <p>
                    This is a bunch of information
                </p>
                <p>
                    about how to pan and zoom and drag
                </p>
                <p>
                    nodes onto the screen
                </p>
            </>
    },
    selected: true,
    position: { x: 0, y: 0 },
};
