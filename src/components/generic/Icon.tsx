import { icons } from 'lucide-react';
import { MouseEvent } from 'react';
import { defaultIconColor, defaultIconSize, defaultIconStrokeWidth } from './styles/styles';

export type IconName = (keyof typeof icons) | 'Blank';

type Props = {
    name: IconName | 'Blank';
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string
    onClick?: (e: MouseEvent) => unknown;

}

const Icon = ({
    name,
    color = defaultIconColor,
    size = defaultIconSize,
    strokeWidth = defaultIconStrokeWidth,
    className,
    onClick = () => { }
}: Props) => {

    if (name === 'Blank') {
        return <div className="icon-placeholder" style={{ width: size, height: size }} />
    }

    const LucideIcon = icons[name];

    return (
        <LucideIcon
            color={color}
            size={size}
            strokeWidth={strokeWidth}
            className={className}
            onClick={onClick} />
    )
};

export default Icon;
