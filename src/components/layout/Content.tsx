import Sidebar from "../generic/Sidebar";
import useSidebarControls from "../hooks/useSidebarControls";
import "./Content.css";

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
            <div id="main-window-container"></div>
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
