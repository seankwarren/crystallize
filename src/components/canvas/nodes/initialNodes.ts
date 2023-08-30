import { Node } from 'reactflow';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'card',
        data: { label: 'Node 1' },
        position: { x: 250, y: 50 },
        // draggable: true,
    },
    {
        id: '2',
        type: 'card',
        data: { label: 'Node 2' },
        position: { x: 250, y: 150 },
        // draggable: true,
    },
];

export default initialNodes;
