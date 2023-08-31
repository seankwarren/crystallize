import ReactFlow, { Background, ReactFlowInstance, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import CanvasControls from './CanvasControls';
import CanvasNodeMenu from './CanvasNodeMenu';
import { edgeTypes } from './edges';
import initialEdges from './edges/initialEdges';
import useCanvasState from './hooks/useCanvasState';
import useDragAndDrop from './hooks/useDragAndDrop';
import useEditable from './hooks/useEditable';
import useUndoRedo from './hooks/useUndoRedo';
import { nodeTypes } from './nodes';
import initialNodes from './nodes/initialNodes';
import './styles/Canvas.css';
import { snapGridInterval } from './styles/styles';

const Canvas = () => {
    const state = useCanvasState({});
    const { nodes, setNodes, edges, setEdges, snapToGrid, isInteractive } = state;
    const {
        undo,
        redo,
        canUndo,
        canRedo,
        takeSnapshot
    } = useUndoRedo({ state });

    const {
        setCanvasInstance,
        canvasWrapper,
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDragOver,
        onDrop,
    } = useDragAndDrop({ takeSnapshot, nodes, setNodes });

    const {
        onNodesChange,
        onEdgesChange,
        onConnect
    } = useEditable({ state, takeSnapshot });

    const { zoomTo } = useReactFlow();

    const onInit = ((instance: ReactFlowInstance) => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        setCanvasInstance(instance);
        zoomTo(1);
    })

    return (
        <div className="canvas-container" ref={canvasWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
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
                onDragOver={onDragOver}
                fitView
                className="canvas">
                <Background className="canvas-background" gap={snapGridInterval} color="var(--md-border-color)" />
                <CanvasControls className="canvas-controls" state={state} undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
                <CanvasNodeMenu />
            </ReactFlow>
        </div >
    )
}

export default Canvas
