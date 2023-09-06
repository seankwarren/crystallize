import { CardNode, GroupNode, ImageNode, NoteNode, SelectionNode } from '.';
import DraggingNode from './custom/DraggingNode';
import IntroNode from './custom/IntroNode';

export type NodeTypes = keyof typeof nodeTypes;

const nodeTypes = {
    intro: IntroNode,
    card: CardNode,
    image: ImageNode,
    note: NoteNode,
    group: GroupNode,
    dragging: DraggingNode,
    selection: SelectionNode,
};

export default nodeTypes;
