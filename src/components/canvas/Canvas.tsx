import { useCanvasStore } from '@stores/canvas';
import { DragEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, Node, NodeDragHandler, OnEdgesDelete, OnNodesDelete, ReactFlowInstance, SelectionDragHandler, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import CanvasControls from './CanvasControls';
import CanvasNodeMenu from './CanvasNodeMenu';
import { edgeTypes } from './edges';
import initialEdges from './edges/initialEdges';
import useEditable from './hooks/useEditable';
import useUndoRedo from './hooks/useUndoRedo';
import { nodeTypes } from './nodes';
import initialNodes from './nodes/initialNodes';
import './styles/Canvas.css';
import { defaultNodeHeight, defaultNodeWidth, snapGridInterval } from './styles/styles';

let id = 0;
const getId = () => `dndnode_${id++}`;

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
    const { zoomTo, project } = useReactFlow();
    const [canvasInstance, setCanvasInstance] = useState<ReactFlowInstance | null>(null);
    const canvasWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [setNodes, setEdges])

    const onInit = ((instance: ReactFlowInstance) => {
        setCanvasInstance(instance)
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

    const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop: DragEventHandler = useCallback(
        (event) => {
            event.preventDefault();

            if (canvasWrapper.current && canvasInstance) {
                takeSnapshot();
                const reactFlowBounds = canvasWrapper.current.getBoundingClientRect();
                const type = event.dataTransfer.getData('application/reactflow');

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !type) {
                    return;
                }

                const position = canvasInstance.project({
                    x: event.clientX - reactFlowBounds.left - defaultNodeWidth,
                    y: event.clientY - reactFlowBounds.top - defaultNodeHeight,
                });
                const newNode: Node = {
                    id: getId(),
                    type,
                    position,
                    data: { label: `${type} node` },
                };

                setNodes(nodes.concat(newNode));
            }
        },
        [canvasInstance, nodes, setNodes, takeSnapshot]
    );

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
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                onNodeDragStart={onNodeDragStart}
                onSelectionDragStart={onSelectionDragStart}
                onNodesDelete={onNodesDelete}
                onEdgesDelete={onEdgesDelete}
                onInit={onInit}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                className="canvas">
                <Background className="canvas-background" gap={snapGridInterval} />
                <CanvasControls className="canvas-controls" undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
                <CanvasNodeMenu />
            </ReactFlow>
        </div >
    )
}

export default Canvas
