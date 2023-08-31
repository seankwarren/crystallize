import NavigationIcon from '@components/layout/NavigationIcon';
import { Edge, Node } from 'reactflow';
import { EdgeTypes, edgeActionsByType } from './edges';
import { NodeTypes, nodeActionsByType } from './nodes';
import './styles/CanvasToolbar.css';
import { ActionsListType } from './types';

type Props = {
    canvasElement: Node | Edge;
}

const CanvasToolbar = ({ canvasElement }: Props) => {

    let actions: ActionsListType<Node> | ActionsListType<Edge>;

    if ('source' in canvasElement) {
        actions = edgeActionsByType(canvasElement.type as EdgeTypes);
        return (
            <div className="canvas-toolbar">
                {Object.entries(actions).map(([, action]) => {
                    return (
                        <NavigationIcon
                            icon={action.icon}
                            onClick={() => { action.onClick(canvasElement); }} />
                    )
                })}
            </div>
        );
    } else {
        actions = nodeActionsByType(canvasElement.type as NodeTypes);
        return (
            <div className="canvas-toolbar">
                {Object.entries(actions).map(([, action]) => {
                    return (
                        <NavigationIcon
                            icon={action.icon}
                            onClick={() => { action.onClick(canvasElement); }} />
                    )
                })}
            </div>
        );
    }
}

export default CanvasToolbar
