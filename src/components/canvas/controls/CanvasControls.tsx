import { CanvasStore } from '@components/canvas/hooks/useCanvasState';
import { canvasMenuWidth, controlIconSize } from '@components/canvas/styles/styles';
import Icon from '@components/generic/Icon';
import { Panel } from '@reactflow/core';
import { MouseEventHandler, useEffect, useState } from 'react';
import { PanelPosition } from 'reactflow';
import CanvasOptions from './CanvasOptions';
import ControlButton from './ControlButton';
import './styles/CanvasControls.css';

type Props = {
    className?: string
    position?: PanelPosition
    store: CanvasStore
    undo: (store: CanvasStore) => void
    redo: (store: CanvasStore) => void
    canUndo: boolean
    canRedo: boolean
}

const CanvasControls = ({
    className,
    position = 'top-right',
    store,
    undo,
    redo,
    canUndo,
    canRedo
}: Props) => {

    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const { isInteractive, toggleIsInteractive, zoomIn, zoomOut, zoomTo, fitView } = store;

    const onZoomInHandler = () => {
        zoomIn();
    };

    const onZoomOutHandler = () => {
        zoomOut();
    };

    const onFitViewHandler = () => {
        fitView();
    };

    const onClickOptions: MouseEventHandler = (e) => {
        if (!isInteractive) {
            toggleIsInteractive();
            return;
        }
        e.stopPropagation();
        const { clientX, clientY } = e;
        setIsMenuVisible(true);
        setMenuPosition({
            top: clientY,
            left: clientX - canvasMenuWidth - 25,
        });
    };

    const onCloseMenu = () => {
        setIsMenuVisible(false);
    }

    const onResetZoomHandler = () => {
        zoomTo(1);
    }

    const onRedoHandler = () => {
        redo(store);
    }

    const onUndoHandler = () => {
        undo(store);
    }

    const onOpenHelpModal = () => { }

    const handleDocumentClick: EventListener = () => {
        setIsMenuVisible(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <>
            <CanvasOptions
                closeMenu={onCloseMenu}
                store={store}
                style={{ ...menuPosition, display: isMenuVisible ? 'flex' : 'none' }} />
            <Panel
                className={`canvas-controls ${className}`}
                position={position}>
                <div className="canvas-controls-section">
                    <ControlButton
                        className="canvas-controls-interactive"
                        onClick={onClickOptions}
                        title="toggle interactivity"
                        aria-label="toggle interactivity">
                        {isInteractive ?
                            <Icon name="Settings" size={controlIconSize} />
                            :
                            <Icon name="Lock" size={controlIconSize} />}
                    </ControlButton>
                </div>
                <div className="canvas-controls-section">
                    <ControlButton
                        onClick={onZoomInHandler}
                        className="canvas-controls-zoomin"
                        title="zoom in"
                        aria-label="zoom in">
                        <Icon name="Plus" size={controlIconSize} />
                    </ControlButton>
                    <ControlButton
                        onClick={onResetZoomHandler}
                        className="canvas-controls-zoomout"
                        title="reset zoom"
                        aria-label="reset zoom">
                        <Icon name="RotateCw" size={controlIconSize} />
                    </ControlButton>
                    <ControlButton
                        onClick={onFitViewHandler}
                        className="canvas-controls-zoomout"
                        title="fit view"
                        aria-label="fit view">
                        <Icon name="Maximize" size={controlIconSize} />
                    </ControlButton>
                    <ControlButton
                        onClick={onZoomOutHandler}
                        className="canvas-controls-zoomout"
                        title="zoom out"
                        aria-label="zoom out">
                        <Icon name="Minus" size={controlIconSize} />
                    </ControlButton>
                </div>
                {isInteractive && <div className="canvas-controls-section">
                    <ControlButton
                        onClick={() => { if (canUndo) onUndoHandler(); }}
                        className={`canvas-controls-undo ${canUndo ? '' : 'disabled'}`}
                        title="undo"
                        aria-label="undo">
                        <Icon name="Undo2" size={controlIconSize} />
                    </ControlButton>
                    <ControlButton
                        onClick={() => { if (canRedo) onRedoHandler(); }}
                        className={`canvas-controls-redo ${canRedo ? '' : 'disabled'}`}
                        title="redo"
                        aria-label="redo">
                        <Icon name="Redo2" size={controlIconSize} />
                    </ControlButton>
                </div>}
                <div className="canvas-controls-section">
                    <ControlButton
                        onClick={onOpenHelpModal}
                        className="canvas-controls-help"
                        title="canvas help"
                        aria-label="canvas help">
                        <Icon name="HelpCircle" size={controlIconSize} />
                    </ControlButton>
                </div>
            </Panel>
        </>
    )
}

export default CanvasControls;
