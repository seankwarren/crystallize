import { useCallback } from 'react';
import { Handle, NodeResizeControl, Position, ResizeControlVariant } from 'reactflow';
import { maxNodeSize, minNodeSize } from '../styles/styles';
import { ColorType, NodeData } from '../types';
import './styles/NoteNode.css';

type Props = {
    id: string;
    selected: boolean;
    data: NodeData;
}

const handleStyle = {
    background: 'none',
    border: 'none',
};

const NoteNode = ({ id, selected, data }: Props) => {

    const { color, isResizable } = data;

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

    const shouldResize = () => !!isResizable
    return (
        <div
            id={id}
            className={`note-node ${selected && 'selected'} nowheel`}
            style={{ boxShadow: boxShadow(color) }}>

            <div className={`note-node-backdrop ${selected && 'selected'}`} style={{ backgroundColor: color }}></div>


            <NodeResizeControl
                position='top'
                variant={ResizeControlVariant.Line}
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(calc(var(--md-spacing) / 2), -75%)',
                    width: 'calc(100% - var(--md-spacing))',
                    height: 'var(--sm-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
            </NodeResizeControl>
            <NodeResizeControl
                position='right'
                variant={ResizeControlVariant.Line}
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-25%, calc(var(--md-spacing) / 2))',
                    width: 'var(--sm-spacing)',
                    height: 'calc(100% - var(--md-spacing))',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom'
                variant={ResizeControlVariant.Line}
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(calc(var(--md-spacing) / 2), -25%)',
                    width: 'calc(100% - var(--md-spacing))',
                    height: 'var(--sm-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
            </NodeResizeControl>
            <NodeResizeControl
                position='left'
                variant={ResizeControlVariant.Line}
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-75%, calc(var(--md-spacing) / 2))',
                    width: 'var(--sm-spacing)',
                    height: 'calc(100% - var(--md-spacing))',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
            </NodeResizeControl>
            <NodeResizeControl
                position='top-left'
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
                {/* <div className="resize-handle top-left-handle" /> */}
            </NodeResizeControl>
            <NodeResizeControl
                position='top-right'
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
                <div className="resize-handle top-right-handle" />
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom-right'
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
                <div className="resize-handle bottom-right-handle" />
            </NodeResizeControl>
            <NodeResizeControl
                position='bottom-left'
                shouldResize={shouldResize}
                style={{
                    ...handleStyle,
                    transform: 'translate(-50%, -50%)',
                    width: 'var(--md-spacing)',
                    height: 'var(--md-spacing)',
                }}
                minWidth={minNodeSize}
                minHeight={minNodeSize}
                maxWidth={maxNodeSize}
                maxHeight={maxNodeSize}>
                <div className="resize-handle bottom-left-handle" />
            </NodeResizeControl>

            <Handle type="source" position={Position.Left} id={`${id}-left`} />
            <Handle type="source" position={Position.Top} id={`${id}-top`} />
            <Handle type="source" position={Position.Right} id={`${id}-right`} />
            <Handle type="source" position={Position.Bottom} id={`${id}-bottom`} />

            <div className='note-node-content'>{data.label}</div>

        </ div>
    )
}

export default NoteNode
