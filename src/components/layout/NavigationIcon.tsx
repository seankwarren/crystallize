import { MouseEventHandler } from "react";
import Icon, { IconName } from "../generic/Icon";
import "./NavigationIcon.css";

type Props = {
    icon: IconName;
    size?: number;
    id?: string;
    className?: string;
    ariaLabel?: string;
    onClick?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
}

const NavigationIcon = ({
    icon,
    size,
    id = "",
    className = "",
    ariaLabel = "",
    onClick = () => { },
    onMouseEnter = () => { },
    onMouseLeave = () => { },
}: Props) => {
    return (
        <button
            id={id}
            className={`nav-icon-container ${className}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <Icon
                name={icon}
                size={size}
                aria-label={ariaLabel} />
        </button>
    )
}

export default NavigationIcon
