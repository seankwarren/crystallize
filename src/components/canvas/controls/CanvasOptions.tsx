import { CanvasStore } from '@components/canvas/hooks/useCanvasState';
import PopupMenu, { MenuItemConfig } from '@components/generic/PopupMenu';
import { CSSProperties, useCallback, useMemo } from 'react';
import './styles/CanvasOptions.css';
type Props = {
    closeMenu: () => void;
    style?: CSSProperties;
    store: CanvasStore;
}

const CanvasOptions = ({ closeMenu, style, store }: Props) => {

    const {
        snapToGrid,
        toggleSnapToGrid,
        snapToObjects,
        toggleSnapToObjects,
        isInteractive,
        toggleIsInteractive
    } = store;

    const handleToggleSnapToGrid = useCallback(() => {
        toggleSnapToGrid();
        closeMenu();
    }, [toggleSnapToGrid, closeMenu])

    const handleToggleSnapToObjects = useCallback(() => {
        toggleSnapToObjects();
        closeMenu();
    }, [toggleSnapToObjects, closeMenu])

    const handleToggleIsInteractive = useCallback(() => {
        toggleIsInteractive();
        closeMenu();
    }, [toggleIsInteractive, closeMenu])

    const config: MenuItemConfig[] = useMemo(() => [
        {
            title: 'Snap to grid',
            iconName: 'Grid3x3',
            value: snapToGrid,
            showCheck: true,
            onClick: handleToggleSnapToGrid,
        },
        {
            title: 'Snap to objects',
            iconName: 'GitPullRequestDraft',
            value: snapToObjects,
            showCheck: true,
            onClick: handleToggleSnapToObjects,
        },
        {
            title: 'Read-only',
            iconName: 'Lock',
            value: !isInteractive,
            showCheck: false,
            onClick: handleToggleIsInteractive,
        },
    ], [handleToggleSnapToGrid, handleToggleSnapToObjects, handleToggleIsInteractive, snapToGrid, snapToObjects, isInteractive])

    return (
        <PopupMenu config={config} showIcons={true} style={style} />
    )
}

export default CanvasOptions
