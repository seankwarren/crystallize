import useResizable from '@components/hooks/useResizable';
import { ReactNode, useRef, useState } from 'react';
import './styles/Sidebar.css';

type Props = {
    side?: 'left' | 'right',
    width?: number;
    resizable?: boolean;
    handleSaveWidth: (width: number) => void;
    toggleSidebar: () => void;
    id?: string;
    className?: string,
    children?: ReactNode
}

const Sidebar = ({
    side = 'left',
    width = 200,
    resizable = true,
    toggleSidebar,
    handleSaveWidth,
    id,
    className,
    children
}: Props) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { sidebarWidth, startResizing, isResizing } = useResizable({
        initialWidth: width,
        toggleSidebar,
        handleSaveWidth,
        anchorSide: side,
        sidebarRef,
    });

    const onMouseOver = () => {
        setIsHovered(true);
    }

    const onMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div
            id={id}
            className={`sidebar sidebar-${side} ${className}`}
            ref={sidebarRef}
            style={{ width: sidebarWidth }}
            onMouseDown={(e) => { e.preventDefault() }}>
            <div className="sidebar-content">{children}</div>
            {resizable &&
                <div
                    className="sidebar-resizer"
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                    style={{
                        backgroundColor: (isResizing || isHovered) ? 'var(--accent)' : 'transparent',
                        borderRight: (isResizing || isHovered) ? '1px solid var(--accent)' : '0px',
                        borderLeft: (isResizing || isHovered) ? '1px solid var(--accent)' : '0px',
                        translate: (side === 'right' && sidebarWidth === 0) ? '-100% 0%' : '0% 0%'
                    }}
                    onMouseDown={startResizing}>
                </div>
            }

        </div>
    )
}
export default Sidebar
