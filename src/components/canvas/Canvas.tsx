import { useCanvasStore } from '@stores/canvas';
import { useCallback, useEffect } from 'react';
import ReactFlow, { Background, NodeDragHandler, OnEdgesDelete, OnNodesDelete, SelectionDragHandler, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import CanvasControls from './CanvasControls';
import { edgeTypes } from './edges';
import initialEdges from './edges/initialEdges';
import useEditable from './hooks/useEditable';
import useUndoRedo from './hooks/useUndoRedo';
import { nodeTypes } from './nodes';
import initialNodes from './nodes/initialNodes';
import './styles/Canvas.css';
import { snapGridInterval } from './styles/styles';

const Canvas = () => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        snapToGrid,
        defaultZoom,
        nodesDraggable,
        nodesConnectable,
    } = useCanvasStore();

    const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo({});
    const { onNodesChange, onEdgesChange, onConnect } = useEditable(takeSnapshot);
    const { fitView, zoomTo } = useReactFlow();

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [setNodes, setEdges])

    const onInit = (() => {
        fitView();
        zoomTo(defaultZoom);
    })

    const onNodeDragStart: NodeDragHandler = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onNodesDelete: OnNodesDelete = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    const onEdgesDelete: OnEdgesDelete = useCallback(() => {
        takeSnapshot();
    }, [takeSnapshot]);

    return (
        <div className="canvas-container">
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
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                onNodeDragStart={onNodeDragStart}
                onSelectionDragStart={onSelectionDragStart}
                onNodesDelete={onNodesDelete}
                onEdgesDelete={onEdgesDelete}
                onInit={onInit}
                className="canvas">
                <Background className="canvas-background" gap={snapGridInterval} />
                <CanvasControls className="canvas-controls" undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
            </ReactFlow>
        </div >
    )
}

export default Canvas
