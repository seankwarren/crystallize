import { canvasOptionMenuIconSize } from '@components/canvas/styles/styles';
import Icon, { IconName } from '@components/generic/Icon';
import { CSSProperties, forwardRef } from 'react';
import './styles/PopupMenu.css';

export type MenuItemConfig = {
    title: string;
    iconName: IconName;
    value: boolean;
    showCheck: boolean;
    onClick: () => void;
    divider?: boolean;
}

type Props = {
    style?: CSSProperties;
    showIcons?: boolean;
    config: MenuItemConfig[]
}

const MenuIcon = (name: IconName, className: string = '') => {
    return (
        <Icon name={name} size={canvasOptionMenuIconSize} className={`menu-item-icon ${className}`} />
    )
}

const PopupMenu = forwardRef<HTMLDivElement, Props>(({ config, showIcons, style }, ref) => {

    return (
        <div className="popup-menu" style={style} ref={ref}>
            {
                config.map(({ title, iconName, value, showCheck, onClick, divider }) => {
                    return (
                        <>
                            <div
                                className="menu-item"
                                onClick={onClick}>
                                <div className='menu-item-label'>
                                    {showIcons && MenuIcon(iconName)}
                                    <span>{title}</span>
                                </div>
                                {showCheck && value ? MenuIcon('Check', 'check') : MenuIcon('Blank')}
                            </div>
                            {divider ? <hr /> : null}
                        </>
                    )
                })
            }
        </div >
    )
})

export default PopupMenu
