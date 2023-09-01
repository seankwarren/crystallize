import { useCallback, useState } from 'react';
import ReactFlow, { Background, ConnectionMode, Node, NodeChange, OnNodesChange, ReactFlowInstance, useOnSelectionChange, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasControls, CanvasNodeMenu } from '.';
import { edgeTypes, initialEdges } from './edges';
import useCanvasState from './hooks/useCanvasState';
import useDragAndDrop from './hooks/useDragAndDrop';
import useUndoRedo from './hooks/useUndoRedo';
import { getHelperLines } from './hooks/utils';
import { initialNodes, nodeTypes } from './nodes';
import HelperLines from './overlays/CanvasHelperLines';
import './styles/Canvas.css';
import { snapGridInterval } from './styles/styles';
import { CanvasToolbar } from './toolbar';

const Canvas = () => {

    const [helperLineHorizontal, setHelperLineHorizontal] = useState<number | undefined>(undefined);
    const [helperLineVertical, setHelperLineVertical] = useState<number | undefined>(undefined);

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
        setSelectedNodes,
        applyNodeChanges,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        edges,
        setEdges,
        setSelectedEdges,
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

    const customApplyNodeChanges = useCallback((changes: NodeChange[], nodes: Node[]): Node[] => {
        // reset the helper lines (clear existing lines, if any)
        setHelperLineHorizontal(undefined);
        setHelperLineVertical(undefined);

        // this will be true if it's a single node being dragged
        // inside we calculate the helper lines and snap position for the position where the node is being moved to
        if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
            const helperLines = getHelperLines(changes[0], nodes);

            // if we have a helper line, we snap the node to the helper line position
            // this is being done by manipulating the node position inside the change object
            changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x;
            changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y;

            // if helper lines are returned, we set them so that they can be displayed
            setHelperLineHorizontal(helperLines.horizontal);
            setHelperLineVertical(helperLines.vertical);
        }

        return applyNodeChanges(changes);
    }, [applyNodeChanges]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            setNodes(customApplyNodeChanges(changes, nodes));
        },
        [nodes, setNodes, customApplyNodeChanges]
    );

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setSelectedNodes(nodes);
            setSelectedEdges(edges);
        }
    });


    const onInit = ((instance: ReactFlowInstance) => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        setCanvasInstance(instance);
        zoomTo(1);
    })

    return (
        <div className="canvas-container" ref={canvasWrapper}>
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {state &&
                <ReactFlow
                    nodes={state.nodes}
                    edges={state.edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
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
                    connectionMode={ConnectionMode.Loose}
                    selectionKeyCode="Meta"
                    multiSelectionKeyCode="Shift"
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
                    <CanvasToolbar state={state} />
                    <HelperLines horizontal={helperLineHorizontal} vertical={helperLineVertical} />
                </ReactFlow>
            }
        </div >
    )
}

export default Canvas
