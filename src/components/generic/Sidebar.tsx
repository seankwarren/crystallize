import { ReactNode, useRef } from "react";
import useResizable from "../hooks/useResizable";
import "./Sidebar.css";

type Props = {
    side?: "left" | "right",
    width?: number;
    resizable?: boolean;
    handleSaveWidth: (width: number) => void;
    toggleSidebar?: () => void;
    id?: string;
    className?: string,
    children?: ReactNode
}

const Sidebar = ({
    side = "left",
    width = 200,
    resizable = true,
    handleSaveWidth,
    toggleSidebar,
    id,
    className,
    children
}: Props) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    const { sidebarWidth, startResizing } = useResizable({
        initialWidth: width,
        toggleSidebar: toggleSidebar,
        handleSaveWidth: handleSaveWidth,
        anchorSide: side,
        sidebarRef: sidebarRef,
    });

    return (
        <div
            id={id}
            className={`sidebar sidebar-${side} ${className}`}
            ref={sidebarRef}
            style={{ width: sidebarWidth }}
            onMouseDown={(e) => e.preventDefault()}>
            <div className="sidebar-content">{children}</div>
            {resizable &&
                <div
                    className="sidebar-resizer"
                    onMouseDown={startResizing}>
                </div>
            }

        </div>
    )
}
export default Sidebar
