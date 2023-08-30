import { RefObject, useCallback, useEffect, useState } from 'react';

type Props = {
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    handleSaveWidth: (width: number) => void;
    toggleSidebar?: () => void;
    anchorSide: 'left' | 'right';
    sidebarRef: RefObject<HTMLDivElement>;
};
const useResizable = ({
    initialWidth = 200,
    minWidth = 150,
    maxWidth = 300,
    handleSaveWidth,
    toggleSidebar,
    anchorSide = 'left',
    sidebarRef,
}: Props) => {
    const closeThreshold = 50;
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(initialWidth);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (e: MouseEvent) => {
            if (isResizing && sidebarRef.current) {
                const rect = sidebarRef.current.getBoundingClientRect();

                let newWidth;
                if (anchorSide === 'right') {
                    newWidth = rect.right - e.clientX;
                } else {
                    // "left"
                    newWidth = e.clientX - rect.left;
                }

                if (newWidth <= maxWidth && newWidth >= minWidth) {
                    setSidebarWidth(newWidth);
                }
                if (newWidth <= closeThreshold) {
                    toggleSidebar && toggleSidebar();
                }
            }
        },
        [anchorSide, maxWidth, minWidth, sidebarRef, toggleSidebar, isResizing]
    );

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        handleSaveWidth(sidebarWidth);
    }, [sidebarWidth, handleSaveWidth]);

    return { sidebarWidth, startResizing };
};

export default useResizable;
