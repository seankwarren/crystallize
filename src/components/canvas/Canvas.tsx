import ReactFlow, { Background, ReactFlowInstance, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasControls, CanvasNodeMenu } from '.';
import { edgeTypes, initialEdges } from './edges';
import useCanvasState from './hooks/useCanvasState';
import useDragAndDrop from './hooks/useDragAndDrop';
import useUndoRedo from './hooks/useUndoRedo';
import { initialNodes, nodeTypes } from './nodes';
import './styles/Canvas.css';
import { snapGridInterval } from './styles/styles';

const Canvas = () => {

    const {
        undo,
        redo,
        canUndo,
        canRedo,
        takeSnapshot
    } = useUndoRedo({});

    const state = useCanvasState({ takeSnapshot });

    const {
        nodes,
        setNodes,
        applyNodeChanges,
        edges,
        setEdges,
        applyEdgeChanges,
        onConnect,
        snapToGrid,
        isInteractive
    } = state;


    const {
        setCanvasInstance,
        canvasWrapper,
        onNodeDragStart,
        onSelectionDragStart,
        onNodesDelete,
        onEdgesDelete,
        onDragOver,
        onDrop,
    } = useDragAndDrop({ state, takeSnapshot });

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
                onNodesChange={applyNodeChanges}
                onEdgesChange={applyEdgeChanges}
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
                <Background
                    className="canvas-background"
                    gap={snapGridInterval}
                    color="var(--md-border-color)" />
                <CanvasControls
                    className="canvas-controls"
                    state={state}
                    undo={undo}
                    redo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo} />
                <CanvasNodeMenu />
            </ReactFlow>
        </div >
    )
}

export default Canvas
