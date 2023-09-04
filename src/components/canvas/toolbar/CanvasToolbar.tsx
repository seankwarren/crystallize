import NavigationIcon from '@components/layout/NavigationIcon';
import { ReactFlowState, XYPosition, getRectOfNodes, useStore } from 'reactflow';
import { CanvasStore } from '../hooks/useCanvasState';
import { getAllowedToolbarActions } from '../toolbar';
import { ActionsListType } from '../types';
import ColorPicker from './ColorPicker';
import './styles/CanvasToolbar.css';

type Props = {
    store: CanvasStore;
}

const storeSelector = (store: ReactFlowState) => ({
    width: store.width,
    height: store.height,
    transform: store.transform,
});

const CanvasToolbar = ({ store }: Props) => {

    const { transform } = useStore(storeSelector);

    const actions: ActionsListType = getAllowedToolbarActions(store);

    // if nodes are selected, position it based on them
    const position: XYPosition = { x: 0, y: 0 };
    let className = '';
    if (store.getSelectedNodes().length > 0) {
        const boundingBox = getRectOfNodes(store.getSelectedNodes());
        // TODO: this is off when multiple nodes are selected
        position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
        position.y = (boundingBox.y) * transform[2] + transform[1]
        className = 'node';
    } else if (store.getSelectedEdges().length > 0) {
        // if no nodes are selected, but edges are, position it based on them
        store.getSelectedEdges().forEach(edge => {
            const sourceNode = store.nodes.find((n) => n.id === edge.source);
            const targetNode = store.nodes.find((n) => n.id === edge.target);
            if (sourceNode && targetNode) {
                const boundingBox = getRectOfNodes([sourceNode, targetNode]);
                position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
                position.y = (boundingBox.y) * transform[2] + transform[1]

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
            <ColorPicker store={store} open={store.colorSelectorOpen} />
            {Object.entries(actions).map(([key, action]) => {
                return (
                    <NavigationIcon
                        key={key}
                        icon={action.icon}
                        onClick={(e) => {
                            action.onClick(store);
                            (!action.preventClickPropagation && e.stopPropagation());
                        }} />
                )
            })}
        </div>
    );
    // }
}

export default CanvasToolbar
