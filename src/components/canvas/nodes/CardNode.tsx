import { NodeProps, Position } from 'reactflow';
import { Handle } from '../handles';
import './styles/CardNode.css';

type NodeData = {
    color?: `#${string}`
}
const CardNode = (props: NodeProps) => {

    const { id, selected, data } = props
    const { color } = (data as NodeData);


    return (
        <div className={`card-node ${selected && 'selected'}`} style={color && { borderColor: color }}>
            <Handle type="source" position={Position.Left} id={`${id}-left`} />
            <Handle type="source" position={Position.Top} id={`${id}-top`} />
            <Handle type="source" position={Position.Right} id={`${id}-right`} />
            <Handle type="source" position={Position.Bottom} id={`${id}-bottom`} />
        </div>
    )
}

export default CardNode
