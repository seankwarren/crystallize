import Icon, { IconName } from '@components/generic/Icon';
import { useCanvasStore } from '@stores/canvas';
import { CSSProperties } from 'react';
import './styles/CanvasOptions.css';
import { menuIconSize } from './styles/styles';
type Props = {
    closeMenu: () => void;
    style?: CSSProperties;
}

const OptionIcon = (name: IconName, className: string = '') => {
    return (
        <Icon name={name} size={menuIconSize} color="var(--primary-font-color)" className={`menu-item-icon ${className}`} />
    )
}
const CanvasOptions = ({ closeMenu, style }: Props) => {

    const {
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive
    } = useCanvasStore();

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
