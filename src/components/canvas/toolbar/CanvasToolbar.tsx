import PopupMenu, { MenuItemConfig } from '@components/generic/PopupMenu';
import NavigationIcon from '@components/layout/NavigationIcon';
import { useEffect, useMemo, useRef } from 'react';
import { ReactFlowState, XYPosition, getRectOfNodes, useStore } from 'reactflow';
import { CanvasStore } from '../hooks/types';
import { getAllowedToolbarActions } from '../toolbar';
import { ActionsListType } from '../types';
import ColorPicker from './ColorPicker';
import './styles/CanvasToolbar.css';

type Props = {
    store: CanvasStore;
}

const storeSelector = (store: ReactFlowState) => ({
    transform: store.transform,
});

const CanvasToolbar = ({ store }: Props) => {

    const { transform } = useStore(storeSelector);
    const alignNodeMenuRef = useRef<HTMLDivElement>(null);

    const actions: ActionsListType = getAllowedToolbarActions(store);

    // if nodes are selected, position it based on them
    const position: XYPosition = { x: 0, y: 0 };
    let className = '';

    if (store.getSelectedNodes().length > 0) {
        const boundingBox = getRectOfNodes(store.getSelectedNodes());
        // TODO: this is off when multiple nodes are selected
        position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
        position.y = (boundingBox.y) * transform[2] + transform[1]
        className = 'node';
    } else if (store.getSelectedEdges().length > 0) {
        // if no nodes are selected, but edges are, position it based on them
        store.getSelectedEdges().forEach(edge => {
            const sourceNode = store.nodes.find((node) => node.id === edge.source);
            const targetNode = store.nodes.find((node) => node.id === edge.target);
            if (sourceNode && targetNode) {
                const boundingBox = getRectOfNodes([sourceNode, targetNode]);
                position.x = (boundingBox.x + boundingBox.width / 2) * transform[2] + transform[0]
                position.y = (boundingBox.y) * transform[2] + transform[1]

            }
        })
        className = 'edge';
    }
    const positionStyle = {
        top: position.y,
        left: position.x,
    }

    useEffect(() => {
        const handleDocumentClick: EventListener = () => {
            console.log('handleDocumentClick');
            store.setAlignNodesMenuOpen(false);
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const config: MenuItemConfig[] = useMemo(() => {
        return [
            {
                title: 'Align left',
                iconName: 'AlignStartVertical',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesVertical('left');
                    store.setAlignNodesMenuOpen(false);
                },
            },
            {
                title: 'Align center',
                iconName: 'AlignCenterVertical',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesVertical('center');
                    store.setAlignNodesMenuOpen(false);
                },
            },
            {
                title: 'Align right',
                iconName: 'AlignEndVertical',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesVertical('right');
                    store.setAlignNodesMenuOpen(false);
                },
                divider: true,
            },
            {
                title: 'Align top',
                iconName: 'AlignStartHorizontal',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesHorizontal('top');
                    store.setAlignNodesMenuOpen(false);
                },
            },
            {
                title: 'Align middle',
                iconName: 'AlignCenterHorizontal',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesHorizontal('middle');
                    store.setAlignNodesMenuOpen(false);
                },
            },
            {
                title: 'Align bottom',
                iconName: 'AlignEndHorizontal',
                value: false,
                showCheck: false,
                onClick: () => {
                    store.alignNodesHorizontal('bottom');
                    store.setAlignNodesMenuOpen(false);
                },
            },
        ]
    }, [store]);

    return (
        <div className={`canvas-toolbar ${className}`} style={positionStyle}>
            <ColorPicker store={store} open={store.colorSelectorOpen} />
            <PopupMenu
                config={config}
                showIcons={true}
                ref={alignNodeMenuRef}
                style={{
                    // position: 'absolute',
                    ...store.alignNodesMenuPosition,
                    display: store.alignNodesMenuOpen ? 'flex' : 'none'
                }} />
            {Object.entries(actions).map(([key, action]) => {
                return (
                    <NavigationIcon
                        key={key}
                        icon={action.icon}
                        onClick={(e) => {
                            action.onClick(store, e);
                            (!action.allowClickPropagation && e.stopPropagation());
                        }} />
                )
            })}
        </div>
    );
    // }
}

export default CanvasToolbar
