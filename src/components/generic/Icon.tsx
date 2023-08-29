import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

type Props = {
    name: IconName;
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string
}

const Icon = ({
    name,
    color = "rgb(147,147,147)",
    size = 18,
    strokeWidth = 1.5,
    className
}: Props) => {
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
