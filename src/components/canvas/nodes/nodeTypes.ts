import { CardNode, GroupNode, ImageNode, NoteNode } from '.';
import DraggingNode from './DraggingNode';
import IntroNode from './IntroNode';

export type NodeTypes = keyof typeof nodeTypes;

const nodeTypes = {
    intro: IntroNode,
    card: CardNode,
    image: ImageNode,
    note: NoteNode,
    group: GroupNode,
    dragging: DraggingNode,
};

export default nodeTypes;
