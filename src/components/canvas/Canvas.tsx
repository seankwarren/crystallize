import { useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    ConnectionMode,
    SelectionMode,
    useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasControls, CanvasNodeMenu } from '.';
import { edgeTypes } from './edges';
import { useCanvasState, useDragAndDrop, useUndoRedo } from './hooks';
import { introNode, nodeTypes } from './nodes';
import HelperLines from './overlays/CanvasHelperLines';
import './styles/Canvas.css';
import { snapGridInterval } from './styles/styles';
import { CanvasToolbar } from './toolbar';

const Canvas = () => {

    const [helperLineHorizontal,] = useState<number | undefined>(undefined);
    const [helperLineVertical,] = useState<number | undefined>(undefined);

    const {
        undo,
        redo,
        canUndo,
        canRedo,
        takeSnapshot
    } = useUndoRedo({});

    const initialState = {
        nodes: [],
        edges: [],
        snapToGrid: true,
        snapToObjects: false,
        isInteractive: true,
        colorSelectorOpen: false,
        alignNodesMenuOpen: false,
        alignNodesMenuPosition: { top: 0, left: 0 },
    }
    const store = useCanvasState({ initialState, takeSnapshot });

    const {
        canvasRef,
        setNodes,
        setSelectedNodes,
        setEdges,
        setSelectedEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        snapToGrid,
        isInteractive,
    } = store;

    const {
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDragStart,
        onDrag,
        onDrop,
        onDragEnd,
    } = useDragAndDrop({ store, takeSnapshot });

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setSelectedNodes(nodes);
            setSelectedEdges(edges);
        }
    });

    const onInit = (() => {
        setNodes([introNode]);
        setEdges([]);
    })

    useEffect(() => {
        document.addEventListener('dragend', onDragEnd);
        return () => {
            document.removeEventListener('dragend', onDragEnd);
        };
    }, [onDragEnd]);

    return (
        <div className="canvas-container" ref={canvasRef}>
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {store &&
                <ReactFlow
                    nodes={store.nodes}
                    edges={store.edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapGrid={[snapGridInterval, snapGridInterval]}
                    snapToGrid={snapToGrid}
                    proOptions={{
                        hideAttribution: true,
                    }}
                    nodesDraggable={isInteractive}
                    nodesConnectable={isInteractive}
                    onNodeDragStart={onNodeDragStart}
                    onSelectionDragStart={onSelectionDragStart}
                    onNodesDelete={onNodesDelete}
                    onEdgesDelete={onEdgesDelete}
                    onInit={onInit}
                    onDrop={onDrop}
                    onDragOver={onDrag}
                    // onDragEnd={onDragEnd}
                    minZoom={0.1}
                    maxZoom={2}
                    connectionMode={ConnectionMode.Loose}
                    selectionKeyCode="Meta"
                    multiSelectionKeyCode="Shift"
                    panOnDrag={true}
                    selectionMode={SelectionMode.Partial}
                    fitView
                    fitViewOptions={{ minZoom: 1, maxZoom: 1 }}
                    className="canvas">
                    <Background
                        className="canvas-background"
                        gap={snapGridInterval}
                        color="var(--md-border-color)" />
                    <CanvasControls
                        className="canvas-controls"
                        store={store}
                        undo={undo}
                        redo={redo}
                        canUndo={canUndo}
                        canRedo={canRedo} />
                    <CanvasNodeMenu onDragStart={onDragStart} />
                    <CanvasToolbar store={store} />
                    <HelperLines horizontal={helperLineHorizontal} vertical={helperLineVertical} />
                </ReactFlow>
            }
        </div >
    )
}

export default Canvas
