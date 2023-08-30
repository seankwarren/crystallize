import { useNavigationStore } from '@stores/navigation';

const useHeaderMenuControls = () => {
    const headerMenuExpanded = useNavigationStore(
        (state) => state.headerMenuExpanded
    );
    const handleExpandMenu = useNavigationStore(
        (state) => state.handleExpandMenu
    );
    const handleCollapseMenu = useNavigationStore(
        (state) => state.handleCollapseMenu
    );

    return {
        headerMenuExpanded,
        handleExpandMenu,
        handleCollapseMenu,
    };
};

export default useHeaderMenuControls;
