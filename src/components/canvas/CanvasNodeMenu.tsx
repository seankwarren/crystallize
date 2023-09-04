import Icon from '@components/generic/Icon';
import { DragEvent } from 'react';
import { Node } from 'reactflow';
import { CanvasStore } from './hooks/useCanvasState';
import { draggingCardNode } from './nodes';
import './styles/CanvasNodeMenu.css';
import { defaultNodeHeight, defaultNodeWidth, nodeDragIconSize } from './styles/styles';

type Props = {
    store: CanvasStore;
}

const CanvasNodeMenu = ({ store }: Props) => {

    const onDragStart = (event: DragEvent, nodeType: string) => {
        // event.preventDefault();
        store.setSelectedEdges([]); // TODO: this is not working
        store.setSelectedNodes([]); // TODO: this is not working
        event.dataTransfer.setDragImage(new Image(), 0, 0);
        event.dataTransfer.setData('application/reactflow', nodeType);

        if (!store.canvasRef.current) return;
        const reactFlowBounds = store.canvasRef.current.getBoundingClientRect();

        const position = store.project({
            x:
                event.clientX -
                reactFlowBounds.left -
                defaultNodeWidth / 2,
            y:
                event.clientY -
                reactFlowBounds.top -
                defaultNodeHeight / 2,
        });

        const draggedNode: Node = {
            ...draggingCardNode,
            position,
        };

        store.addNode(draggedNode);
    };

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
