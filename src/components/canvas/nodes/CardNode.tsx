import { useCallback } from 'react';
import { Handle, NodeResizeControl, Position, ResizeControlVariant } from 'reactflow';
import { defaultNodeHeight, defaultNodeWidth } from '../styles/styles';
import { ColorType, NodeData } from '../types';
import './styles/CardNode.css';

type Props = {
    id: string;
    selected: boolean;
    data: NodeData;
}

const handleStyle = {
    background: 'none',
    border: 'none',
};

const CardNode = ({ id, selected, data }: Props) => {

    const { color, isResizable = false } = data;

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
        <div id={id} className={`card-node ${selected && 'selected'} nowheel`} style={{ boxShadow: boxShadow(color) }}>

            <div className={`card-node-backdrop ${selected && 'selected'}`} style={{ backgroundColor: color }}></div>


            <NodeResizeControl
                position='top'
                variant={ResizeControlVariant.Line}
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(calc(var(--md-spacing) / 2), -75%)',
                    width: 'calc(100% - var(--md-spacing))',
                    height: 'var(--sm-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
            </NodeResizeControl>
            <NodeResizeControl
                position='right'
                variant={ResizeControlVariant.Line}
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-25%, calc(var(--md-spacing) / 2))',
                    width: 'var(--sm-spacing)',
                    height: 'calc(100% - var(--md-spacing))',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom'
                variant={ResizeControlVariant.Line}
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(calc(var(--md-spacing) / 2), -25%)',
                    width: 'calc(100% - var(--md-spacing))',
                    height: 'var(--sm-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
            </NodeResizeControl>
            <NodeResizeControl
                position='left'
                variant={ResizeControlVariant.Line}
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-75%, calc(var(--md-spacing) / 2))',
                    width: 'var(--sm-spacing)',
                    height: 'calc(100% - var(--md-spacing))',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
            </NodeResizeControl>
            <NodeResizeControl
                position='top-left'
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
                {/* <div className="resize-handle top-left-handle" /> */}
            </NodeResizeControl>
            <NodeResizeControl
                position='top-right'
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
                <div className="resize-handle top-right-handle" />
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom-right'
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
                <div className="resize-handle bottom-right-handle" />
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom-left'
                shouldResize={() => isResizable}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={defaultNodeWidth}
                minHeight={defaultNodeHeight}>
                <div className="resize-handle bottom-left-handle" />
            </NodeResizeControl>

            <Handle type="source" position={Position.Left} id={`${id}-left`} />
            <Handle type="source" position={Position.Top} id={`${id}-top`} />
            <Handle type="source" position={Position.Right} id={`${id}-right`} />
            <Handle type="source" position={Position.Bottom} id={`${id}-bottom`} />

            <div className='card-node-content'>{data.label}</div>

        </ div>
    )
}

export default CardNode
