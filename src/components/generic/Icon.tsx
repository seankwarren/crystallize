import { icons } from 'lucide-react';
import { defaultIconColor, defaultIconSize, defaultIconStrokeWidth } from './styles/styles';

export type IconName = (keyof typeof icons) | 'Blank';

type Props = {
    name: IconName | 'Blank';
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string
}

const Icon = ({
    name,
    color = defaultIconColor,
    size = defaultIconSize,
    strokeWidth = defaultIconStrokeWidth,
    className
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
            className={className} />
    )
};

export default Icon;
