import { CardNode, GroupNode, ImageNode, NoteNode } from '.';
import DraggingNode from './custom/DraggingNode';
import IntroNode from './custom/IntroNode';
import SelectionNode from './custom/SelectionNode';

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
