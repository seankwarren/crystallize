import { Handle, Position } from 'reactflow';
// import { nodeActionsByType } from ".";
import './styles/CardNode.css';

const CardNode = () => {

    // const actions = nodeActionsByType("card");

    return (
        <div className="card node">
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export default CardNode
