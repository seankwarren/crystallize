import { CanvasStore } from '@components/canvas/hooks/useCanvasState';
import { menuIconSize } from '@components/canvas/styles/styles';
import Icon, { IconName } from '@components/generic/Icon';
import { CSSProperties } from 'react';
import './styles/CanvasOptions.css';
type Props = {
    closeMenu: () => void;
    style?: CSSProperties;
    store: CanvasStore;
}

const OptionIcon = (name: IconName, className: string = '') => {
    return (
        <Icon name={name} size={menuIconSize} color="var(--primary-font-color)" className={`menu-item-icon ${className}`} />
    )
}
const CanvasOptions = ({ closeMenu, style, store }: Props) => {

    const {
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive
    } = store;

    const handleToggleSnapToGrid = () => {
        toggleSnapToGrid();
        closeMenu();
    }
    const handleToggleSnapToObjects = () => {
        toggleSnapToObjects();
        closeMenu();
    }
    const handleToggleIsInteractive = () => {
        toggleIsInteractive();
        closeMenu();
    }

    return (
        <div className="canvas-options-menu" style={style}>
            <div
                className="menu-item"
                onClick={handleToggleSnapToGrid}>
                <div className='menu-item-label'>
                    {OptionIcon('Grid3x3')}
                    <span>Snap to grid</span>
                </div>
                {snapToGrid ? OptionIcon('Check', 'check') : OptionIcon('Blank')}
            </div>
            <div
                className="menu-item"
                onClick={handleToggleSnapToObjects}>
                <div className='menu-item-label'>
                    {OptionIcon('GitPullRequestDraft')}
                    <span>Snap to objects</span>
                </div>
                {snapToObjects ? OptionIcon('Check', 'check') : OptionIcon('Blank')}
            </div>
            <div
                className="menu-item"
                onClick={handleToggleIsInteractive}>
                <div className='menu-item-label'>
                    {OptionIcon('Lock')}
                    <span>Read-only</span>
                </div>
                {!isInteractive ? OptionIcon('Check', 'check') : OptionIcon('Blank')}
            </div>
        </div >
    )
}

export default CanvasOptions
