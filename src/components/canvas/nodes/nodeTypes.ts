import { CardNode, GroupNode, ImageNode, NoteNode } from '.';

export type NodeTypes = keyof typeof nodeTypes;

const nodeTypes = {
    card: CardNode,
    image: ImageNode,
    note: NoteNode,
    group: GroupNode,
};

export default nodeTypes;
