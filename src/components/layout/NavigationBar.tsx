import { devLog } from '@utils/.';
import { useState } from 'react';
import NavigationIcon from './NavigationIcon';
import './styles/NavigationBar.css';

const NavigationBar = () => {

    const [isOpenVaultHovered, setIsOpenVaultHovered] = useState<boolean>(false);
    const handleOpenQuickSwitcher = () => { devLog('handleOpenQuickSwitcher') }
    const handleOpenGraphView = () => { devLog('handleOpenGraphView') }
    const handleCreateNewCanvas = () => { devLog('handleCreateNewCanvas') }
    const handleOpenDailyNote = () => { devLog('handleOpenDailyNote') }
    const handleInsertTemplate = () => { devLog('handleInsertTemplate') }
    const handleOpenCommandPalette = () => { devLog('handleOpenCommandPalette') }
    const handleOpenVault = () => { devLog('handleOpenVault') }
    const handleOpenHelp = () => { devLog('handleOpenHelp') }
    const handleOpenSettings = () => { devLog('handleOpenSettings') }

    return (
        <div id="navbar-wrapper">
            <div id="navbar-top">
                <NavigationIcon
                    icon="FileSearch"
                    className="navbar-icon"
                    ariaLabel="open quick switcher"
                    onClick={handleOpenQuickSwitcher} />
                <NavigationIcon
                    icon="GitFork"
                    className="navbar-icon"
                    ariaLabel="graph view"
                    onClick={handleOpenGraphView} />
                <NavigationIcon
                    icon="LayoutDashboard"
                    className="navbar-icon"
                    ariaLabel="create canvas"
                    onClick={handleCreateNewCanvas} />
                <NavigationIcon
                    icon="Calendar"
                    className="navbar-icon"
                    ariaLabel="open daily note"
                    onClick={handleOpenDailyNote} />
                <NavigationIcon
                    icon="Files"
                    className="navbar-icon"
                    ariaLabel="insert template"
                    onClick={handleInsertTemplate} />
                <NavigationIcon
                    icon="Terminal"
                    className="navbar-icon"
                    ariaLabel="open command palette"
                    onClick={handleOpenCommandPalette} />
            </div>
            <div id="navbar-bottom">
                <NavigationIcon
                    icon={isOpenVaultHovered ? 'PackageOpen' : 'Package'}
                    className="navbar-icon"
                    ariaLabel="open package"
                    onMouseEnter={() => { setIsOpenVaultHovered(true) }}
                    onMouseLeave={() => { setIsOpenVaultHovered(false) }}
                    onClick={handleOpenVault} />
                <NavigationIcon
                    icon="HelpCircle"
                    className="navbar-icon"
                    ariaLabel="open help"
                    onClick={handleOpenHelp} />
                <NavigationIcon
                    icon="Settings"
                    className="navbar-icon"
                    ariaLabel="open settings"
                    onClick={handleOpenSettings} />
            </div>
        </div >
    )
}

export default NavigationBar;
