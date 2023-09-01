import { Node } from 'reactflow';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'card',
        data: { label: 'Node 1', color: '' },
        position: { x: 250, y: 50 },
        // draggable: true,
    },
    {
        id: '2',
        type: 'card',
        data: { label: 'Node 2', color: '' },
        position: { x: 250, y: 150 },
        // draggable: true,
    },
];

export const draggingCardNode: Node = {
    id: 'dragging-card',
    type: 'card',
    data: { label: 'Node 1', color: 'rgb(168, 130, 255)' },
    position: { x: 0, y: 0 },
};

export default initialNodes;
