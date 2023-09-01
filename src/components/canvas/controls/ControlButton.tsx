import type { ControlButtonProps } from '../types';
import './styles/ControlButton.css';
const ControlButton = ({ children, className, ...rest }: ControlButtonProps) => {
    return (
        <button type="button" className={`controls-button ${className}`} {...rest}>
            {children}
        </button>
    )
};

export default ControlButton;
