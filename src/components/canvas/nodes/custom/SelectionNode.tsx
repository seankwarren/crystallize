import { NodeProps, useStore } from 'reactflow';
import '../styles/SelectionNode.css';

const boxShadow = '0px 0px 0px var(--md-spacing) var(--selection-node-color)'

const SelectionNode = ({ id, selected }: NodeProps) => {

    const size = useStore((s) => {
        const node = s.nodeInternals.get(id);

        if (!node || !node.width || !node.height) return {}
        return {
            width: node.width,
            height: node.height,
        };
    });
    console.log(size)
    return (
        <div
            id={id}
            className={`selection-node ${selected && 'selected'} nowheel`}
            style={{
                boxShadow,
                width: size.width,
                height: size.height,
                backgroundColor: 'var(--selection-node-color)',
            }}>
        </ div>
    )
}

export default SelectionNode;
