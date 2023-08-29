import { useLayoutStore } from '../../stores/layout';

const useSidebarControls = () => {
    const leftSidebarOpen = useLayoutStore((state) => state.leftSidebarOpen);
    const rightSidebarOpen = useLayoutStore((state) => state.rightSidebarOpen);
    const toggleLeftSidebar = useLayoutStore(
        (state) => state.toggleLeftSidebar
    );
    const toggleRightSidebar = useLayoutStore(
        (state) => state.toggleRightSidebar
    );
    const leftSidebarWidth = useLayoutStore((state) => state.leftSidebarWidth);
    const rightSidebarWidth = useLayoutStore(
        (state) => state.rightSidebarWidth
    );
    const setLeftSidebarWidth = useLayoutStore(
        (state) => state.setLeftSidebarWidth
    );
    const setRightSidebarWidth = useLayoutStore(
        (state) => state.setRightSidebarWidth
    );

    return {
        leftSidebarOpen,
        rightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        leftSidebarWidth,
        rightSidebarWidth,
        setLeftSidebarWidth,
        setRightSidebarWidth,
    };
};

export default useSidebarControls;
