import Icon from '@components/generic/Icon';
import { useCallback, useEffect, useRef } from 'react';
import { Node } from 'reactflow';
import { CanvasState } from '../hooks/useCanvasState';
import { EdgeData, NodeData } from '../types';
import './styles/ColorPicker.css';

type Props = {
    state: CanvasState
    open: boolean;
}

const DEFAULT_COLORS = [
    '#808080',
    'rgb(251, 70, 76)',
    'rgb(233, 151, 63)',
    '#FFFF00',
    'rgb(69, 207, 110)',
    'rgb(83, 223, 221)',
    'rgb(168, 130, 255)',
]

const ColorPicker = ({ state, open = false }: Props) => {

    const colorPickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
            state.setColorSelectorOpen(false);
            console.log('click outside');
        }
    }, [state]);

    useEffect(() => {
        if (open) {
            window.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, handleClickOutside]);

    const onHover = (event: React.MouseEvent<HTMLDivElement>, color: string) => {
        const boxShadow = color ? getBoxShadow(color) : getBoxShadow(event.currentTarget.style.backgroundColor);
        event.currentTarget.style.boxShadow = boxShadow
        console.log(color, getBoxShadow(color));
    }

    const onLeave = (event: React.MouseEvent<HTMLDivElement>, color: string) => {
        event.currentTarget.style.boxShadow = checkSelectedColors() === color ? getBoxShadow(color) : 'none';
    }

    const onSetColors = useCallback((color: string) => {
        state.setColors(color, state.selectedNodes, state.selectedEdges);
        state.setColorSelectorOpen(false);
    }, [state]);

    const checkSelectedColors = () => {
        const nodeColors = state.selectedNodes.map(node => (node.data as NodeData).color);
        const edgeColors = state.selectedEdges.map(edge => (edge.data as EdgeData).color);
        const allColors = [...nodeColors, ...edgeColors];
        return allColors.length > 0 && allColors.every(color => color === allColors[0]) ? allColors[0] : null;
    };

    const getBoxShadow = (color: string) => {
        return `var(--main-bg-color) 0px 0px 0px var(--lg-border-width), ${color} 0px 0px 0px calc(var(--lg-border-width)*2)`;
    };

    return open ? (
        <div className='color-picker' ref={colorPickerRef}>
            {DEFAULT_COLORS.map((color) => {
                const selectedColor = checkSelectedColors();
                const boxShadow = (selectedColor === color) ? getBoxShadow(color) : 'none';
                return (
                    <div key={color} className='color-picker-item' style={
                        {
                            backgroundColor: color,
                            borderColor: color,
                            boxShadow: boxShadow,
                        }}
                        onClick={() => { onSetColors(color) }}
                        onMouseEnter={(e) => { onHover(e, color); }}
                        onMouseLeave={(e) => { onLeave(e, color); }}>
                    </div>
                )
            })}
            <Icon name="Pipette" />
        </div >
    ) : null;
}

export default ColorPicker
