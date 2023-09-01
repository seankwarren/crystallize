import Icon, { IconName } from '@components/generic/Icon';
import { CSSProperties } from 'react';
import { CanvasState } from '../hooks/useCanvasState';
import { menuIconSize } from '../styles/styles';
import './styles/CanvasOptions.css';
type Props = {
    closeMenu: () => void;
    style?: CSSProperties;
    state: CanvasState;
}

const OptionIcon = (name: IconName, className: string = '') => {
    return (
        <Icon name={name} size={menuIconSize} color="var(--primary-font-color)" className={`menu-item-icon ${className}`} />
    )
}
const CanvasOptions = ({ closeMenu, style, state }: Props) => {

    const {
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive
    } = state;

    return (
        <div className="canvas-options-menu" style={style}>
            <div
                className="menu-item"
                onClick={() => { toggleSnapToGrid(); closeMenu() }}>
                <div className='menu-item-label'>
                    {OptionIcon('Grid3x3')}
                    <span>Snap to grid</span>
                </div>
                {snapToGrid ? OptionIcon('Check', 'check') : OptionIcon('Blank')}
            </div>
            <div
                className="menu-item"
                onClick={() => { toggleSnapToObjects(); closeMenu() }}>
                <div className='menu-item-label'>
                    {OptionIcon('GitPullRequestDraft')}
                    <span>Snap to objects</span>
                </div>
                {snapToObjects ? OptionIcon('Check', 'check') : OptionIcon('Blank')}
            </div>
            <div
                className="menu-item"
                onClick={() => { toggleIsInteractive(); closeMenu() }}>
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
