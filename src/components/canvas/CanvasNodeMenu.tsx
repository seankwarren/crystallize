import Icon from '@components/generic/Icon';
import { DragEvent } from 'react';
import './styles/CanvasNodeMenu.css';
import { nodeDragIconSize } from './styles/styles';

const CanvasNodeMenu = () => {

    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className='canvas-node-menu'>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event: DragEvent) => { onDragStart(event, 'card'); }}
                draggable>
                <Icon name="StickyNote" size={nodeDragIconSize} />
            </div>
            <div className="vertical-hr"></div>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event: DragEvent) => { onDragStart(event, 'note'); }}
                draggable>
                <Icon name="FileText" size={nodeDragIconSize} />
            </div>
            <div className="vertical-hr"></div>
            <div
                className="canvas-node-drag-item"
                onDragStart={(event: DragEvent) => { onDragStart(event, 'image'); }}
                draggable>
                <Icon name="FileImage" size={nodeDragIconSize} />
            </div>
        </div>
    )
}

export default CanvasNodeMenu
