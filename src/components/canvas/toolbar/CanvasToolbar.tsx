import NavigationIcon from '@components/layout/NavigationIcon';
import { ReactFlowState, XYPosition, getRectOfNodes, useStore } from 'reactflow';
import { CanvasState } from '../hooks/useCanvasState';
import { getAllowedToolbarActions } from '../toolbar';
import { ActionsListType } from '../types';
import ColorPicker from './ColorPicker';
import './styles/CanvasToolbar.css';

type Props = {
    state: CanvasState;
}

const storeSelector = (state: ReactFlowState) => ({
    width: state.width,
    height: state.height,
    transform: state.transform,
});

const CanvasToolbar = ({ state }: Props) => {

    const { transform } = useStore(storeSelector);

    const actions: ActionsListType = getAllowedToolbarActions(state);

    // if nodes are selected, position it based on them
    const position: XYPosition = { x: 0, y: 0 };
    let className = '';
    if (state.selectedNodes.length > 0) {
        const boundingBox = getRectOfNodes(state.selectedNodes);
        position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
        position.y = boundingBox.y * transform[2] + transform[1]
        className = 'node';
    } else if (state.selectedEdges.length > 0) {
        // if no nodes are selected, but edges are, position it based on them
        state.selectedEdges.forEach(edge => {
            const sourceNode = state.nodes.find((n) => n.id === edge.source);
            const targetNode = state.nodes.find((n) => n.id === edge.target);
            if (sourceNode && targetNode) {
                const boundingBox = getRectOfNodes([sourceNode, targetNode]);
                position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
                position.y = (boundingBox.y + boundingBox.height / 2) * transform[2] + transform[1]

            }
        })
        className = 'edge';
    }
    const positionStyle = {
        top: position.y,
        left: position.x,
    }


    return (
        <div className={`canvas-toolbar ${className}`} style={positionStyle}>
            <ColorPicker state={state} open={state.colorSelectorOpen} />
            {Object.entries(actions).map(([key, action]) => {
                return (
                    <NavigationIcon
                        key={key}
                        icon={action.icon}
                        onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(state);
                        }} />
                )
            })}
        </div>
    );
    // }
}

export default CanvasToolbar
