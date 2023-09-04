import { NodeData } from '../types';
import './styles/DraggingNode.css';
type Props = {
    data: NodeData
}

const DraggingNode = ({ data }: Props) => {

    let style = {};
    switch (data.draggedType) {
        case 'card':
            style = {
                width: 'var(--default-card-node-width)',
                height: 'var(--default-card-node-height)'
            }
            break;
        case 'image':
            style = {
                width: 'var(--default-image-node-width)',
                height: 'var(--default-image-node-height)'
            }
            break;
        case 'note':
            style = {
                width: 'var(--default-note-node-width)',
                height: 'var(--default-note-node-height)'
            }
            break;
        default:
            break;
    }
    return (
        <div style={style} className="dragging-node"></div>
    )
}

export default DraggingNode
