import { useCallback } from 'react';
import { Position } from 'reactflow';
import { Handle } from '../handles';
import './styles/CardNode.css';

export type ColorType = `#${string}` | `rgb(${string}}` | ''

export type NodeData = {
    color?: ColorType
}

type Props = {
    id: string;
    selected: boolean;
    data: NodeData;
}
const CardNode = ({ id, selected, data }: Props) => {

    // const { id, selected, data } = props
    const { color } = data;

    const boxShadow = useCallback((color: ColorType | undefined): string => {
        if (!color && !selected) {
            return '0px 0px 0px calc(var(--xl-border-width)) var(--lt-border-color)'
        }
        if (!color && selected) {
            return '0px 0px 0px calc(var(--xl-border-width) * 2) var(--accent)'
        }
        if (color && selected) {
            return `0px 0px 0px calc(var(--xl-border-width) * 2) ${color}`
        }
        if (color && !selected) {
            return `0px 0px 0px calc(var(--xl-border-width)) ${color}`
        }
        return ''
    }, [selected])

    return (
        <div className={`card-node ${selected && 'selected'}`} style={{ boxShadow: boxShadow(color) }}>
            <div className={`card-node-backdrop ${selected && 'selected'}`} style={{ backgroundColor: color }}></div>
            <Handle type="source" position={Position.Left} id={`${id}-left`} />
            <Handle type="source" position={Position.Top} id={`${id}-top`} />
            <Handle type="source" position={Position.Right} id={`${id}-right`} />
            <Handle type="source" position={Position.Bottom} id={`${id}-bottom`} />
        </ div>
    )
}

export default CardNode
