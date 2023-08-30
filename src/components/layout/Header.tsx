import useHeaderMenuControls from '@components/hooks/useHeaderMenuControls';
import useModalControls from '@components/hooks/useModalControls';
import useSidebarControls from '@components/hooks/useSidebarControls';
import useWindowControls from '@components/hooks/useWindowControls';
import NavigationIcon from './NavigationIcon';
import './styles/Header.css';

const Header = () => {
    const openSearchOptions = () => { }
    const openFiles = () => { }
    const openBookmarks = () => { }


    const {
        leftSidebarOpen,
        rightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        leftSidebarWidth,
        rightSidebarWidth
    } = useSidebarControls();
    const { handleExpandMenu } = useHeaderMenuControls();
    const { handleMinimize, handleMaximize, handleClose } = useWindowControls();
    const { handleOpenModal, setModalTitle, setModalContents, setShowModalClose } = useModalControls();

    const testText = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna 
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit 
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
        occaecat cupidatat non proident, sunt in culpa qui officia 
        deserunt mollit anim id est laborum.
    `

    const handleOpenTestModal = () => {
        handleOpenModal();
        setModalTitle('Header Menu');
        setModalContents(testText);
        setShowModalClose(false);
    }


    return (
        <div id="main-header-wrapper">
            <div id="header-left-wrapper">
                <NavigationIcon
                    icon="PanelLeftInactive"
                    className="header-icon"
                    ariaLabel="toggle left sidebar"
                    onClick={toggleLeftSidebar} />
            </div>
            <div id="header-content-wrapper">
                {leftSidebarOpen &&
                    <div className="header-sidebar-header left" style={{ width: leftSidebarWidth }}>
                        <NavigationIcon
                            icon="FolderClosed"
                            className="header-icon"
                            ariaLabel="open files"
                            onClick={openFiles} />
                        <NavigationIcon
                            icon="Search"
                            className="header-icon"
                            ariaLabel="search"
                            onClick={openSearchOptions} />
                        <NavigationIcon
                            icon="Bookmark"
                            className="header-icon"
                            ariaLabel="open bookmarks"
                            onClick={openBookmarks} />
                    </div>
                }
                <div
                    id="tabs-container"
                    style={{
                        marginRight: rightSidebarOpen ? 0 : 'calc(calc(var(--md-icon-size) + calc(var(--sm-spacing) * 3)) * 3)'
                    }}>
                    <NavigationIcon
                        icon="ChevronDown"
                        className="header-icon"
                        ariaLabel="expand menu"
                        onClick={() => {
                            handleExpandMenu();
                            handleOpenTestModal();
                        }} />
                    <NavigationIcon
                        icon="PanelRightInactive"
                        className="header-icon"
                        ariaLabel="toggle right sidebar"
                        onClick={toggleRightSidebar} />
                </div>
                {rightSidebarOpen &&
                    <div className="header-sidebar-header right" style={{ width: rightSidebarWidth }}>
                        Contentekjnwdfjnx
                    </div>}
                <div id="header-right-wrapper">
                    <NavigationIcon
                        icon="Minus"
                        className="header-icon window-controls"
                        ariaLabel="minimize"
                        onClick={handleMinimize} />
                    <NavigationIcon
                        icon="Square"
                        className="header-icon window-controls"
                        ariaLabel="maximize"
                        onClick={handleMaximize} />
                    <NavigationIcon
                        icon="X"
                        className="header-icon window-controls close"
                        ariaLabel="close"
                        onClick={handleClose} />
                </div>
            </div >
        </div >
    )
}

export default Header;
