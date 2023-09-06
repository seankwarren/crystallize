import { useCallback, useEffect, useRef } from 'react';
import { CanvasStore } from '../hooks/types';
import { ColorType, EdgeData, NodeData } from '../types';
import { getSelectedEdges, getSelectedNodes } from '../utils';
import './styles/ColorPicker.css';

type Props = {
    store: CanvasStore
    open: boolean;
}

const DEFAULT_COLORS: ColorType[] = [
    '#808080',
    'rgb(251, 70, 76)',
    'rgb(233, 151, 63)',
    '#FFFF00',
    'rgb(69, 207, 110)',
    'rgb(83, 223, 221)',
    'rgb(168, 130, 255)',
]

const ColorPicker = ({ store, open = false }: Props) => {

    const colorPickerRef = useRef<HTMLDivElement>(null);

    const handleDocumentClick: EventListener = useCallback((e) => {

        if (colorPickerRef.current && colorPickerRef.current.contains(e.target as Node)) return

        store.setColorSelectorOpen(false);
    }, [store]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [handleDocumentClick]);

    const onHover = (event: React.MouseEvent<HTMLDivElement>, color: ColorType) => {
        const boxShadow = color ? getBoxShadow(color) : getBoxShadow(event.currentTarget.style.backgroundColor as ColorType);
        event.currentTarget.style.boxShadow = boxShadow
    }

    const onLeave = (event: React.MouseEvent<HTMLDivElement>, color: ColorType) => {
        event.currentTarget.style.boxShadow = checkSelectedColors() === color ? getBoxShadow(color) : 'none';
    }

    const onSetColors = useCallback((color: ColorType) => {
        store.setColors(color, getSelectedNodes(store.nodes), getSelectedEdges(store.edges));
        store.setColorSelectorOpen(false);
    }, [store]);

    const checkSelectedColors = () => {
        const nodeColors = getSelectedNodes(store.nodes).map(node => (node.data as NodeData).color || undefined);
        const edgeColors = getSelectedEdges(store.edges).map(edge => (edge.data as EdgeData).color);
        const allColors = [...nodeColors, ...edgeColors];
        return allColors.length > 0 && allColors.every(color => color === allColors[0]) ? allColors[0] : null;
    };

    const getBoxShadow = (color: ColorType) => {
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
            {/* <Icon name="Pipette" /> */}
        </div >
    ) : null;
}

export default ColorPicker
