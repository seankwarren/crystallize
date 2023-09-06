import { NodeProps, useStore } from 'reactflow';
import '../styles/SelectionNode.css';

type Props = {
    id: string;
    selected: boolean;
    width: number;
    height: number;
}

const boxShadow = '0px 0px 0px calc(var(--xl-border-width)) var(--intro-node-color)'

const SelectionNode = ({ id, selected }: NodeProps) => {

    const size = useStore((s) => {
        const node = s.nodeInternals.get(id);

        if (!node || !node.width || !node.height) return {}
        return {
            width: node.width,
            height: node.height,
        };
    });

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
