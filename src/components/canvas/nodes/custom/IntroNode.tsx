import { NodeProps } from 'reactflow';
import { NodeData } from '../../types';
import '../styles/IntroNode.css';

const IntroNode = ({ id, data }: NodeProps<NodeData>) => {

    const { label } = data;

    return (
        <div id={id} className="intro-node">
            {label}
        </div>
    )
}

export default IntroNode;
