import NavigationIcon from "components/layout/NavigationIcon";
import { Edge, Node } from "reactflow";
import { ActionsListType } from "./actions";
import { edgeActionsByType } from "./edges";
import { EdgeTypes } from "./edges/edgeTypes";
import { nodeActionsByType } from "./nodes";
import { NodeTypes } from "./nodes/nodeTypes";

type Props = {
    canvasElement: Node | Edge;
}

const CanvasToolbar = ({ canvasElement }: Props) => {

    let actions: ActionsListType<Node> | ActionsListType<Edge>;

    if ('source' in canvasElement) {
        actions = edgeActionsByType(canvasElement.type as EdgeTypes);
    } else {
        actions = nodeActionsByType(canvasElement.type as NodeTypes);
    }

    return (
        <div className="canvas-toolbar">
            {Object.entries(actions).map(([, action]) => {
                return (
                    <NavigationIcon
                        icon={action.icon}
                        onClick={() => action.onClick(canvasElement)} />
                )
            })}
        </div>
    )
}

export default CanvasToolbar
