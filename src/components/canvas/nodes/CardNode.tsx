import { Handle, NodeProps, Position } from 'reactflow';
// import { nodeActionsByType } from ".";
import './styles/CardNode.css';

type NodeData = {
    color?: `#${string}`
}
const CardNode = ({ selected, data }: NodeProps) => {

    // const actions = nodeActionsByType("card");
    const { color } = (data as NodeData);

    return (
        <div className={`card-node ${selected && 'selected'}`} style={color && { borderColor: color }}>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export default CardNode
