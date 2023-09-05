import Icon from '@components/generic/Icon';
import { DragEvent } from 'react';
import { NodeTypes } from './nodes';
import './styles/CanvasNodeMenu.css';
import { nodeDragIconSize } from './styles/styles';

type Props = {
    onDragStart: (event: DragEvent, type: NodeTypes) => void;
}

const CanvasNodeMenu = ({ onDragStart }: Props) => {

    return (
        <div className='canvas-node-menu'>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event) => { onDragStart(event, 'card'); }}
                draggable>
                <Icon name="StickyNote" size={nodeDragIconSize} />
            </div>
            <div className="vertical-hr"></div>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event) => { onDragStart(event, 'note'); }}
                draggable>
                <Icon name="FileText" size={nodeDragIconSize} />
            </div>
            <div className="vertical-hr"></div>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event) => { onDragStart(event, 'image'); }}
                draggable>
                <Icon name="FileImage" size={nodeDragIconSize} />
            </div>
        </div>
    )
}

export default CanvasNodeMenu
