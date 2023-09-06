import CanvasWithProvider from '@components/canvas/CanvasWithProvider';
import Sidebar from '@components/generic/Sidebar';
import useSidebarControls from '@components/hooks/useSidebarControls';
import './styles/Content.css';

const Content = () => {

    const {
        leftSidebarOpen,
        rightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        leftSidebarWidth,
        rightSidebarWidth,
        setLeftSidebarWidth,
        setRightSidebarWidth,
    } = useSidebarControls();

    return (
        <div id="main-content-wrapper">
            {leftSidebarOpen &&
                <Sidebar
                    id="main-left-sidebar"
                    side="left"
                    width={leftSidebarWidth}
                    handleSaveWidth={setLeftSidebarWidth}
                    toggleSidebar={toggleLeftSidebar} />}
            <div id="main-window-container">
                <CanvasWithProvider />
                {/* <CanvasWithProvider /> */}
            </div>
            {rightSidebarOpen &&
                <Sidebar
                    id="main-right-sidebar"
                    side="right"
                    width={rightSidebarWidth}
                    handleSaveWidth={setRightSidebarWidth}
                    toggleSidebar={toggleRightSidebar} />}
        </div>
    )
}

export default Content
