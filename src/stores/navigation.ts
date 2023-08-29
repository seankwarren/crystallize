import { create } from 'zustand';

type NavigationState = {
    headerMenuExpanded: boolean;
    handleExpandMenu: () => void;
    handleCollapseMenu: () => void;
};
export const useNavigationStore = create<NavigationState>((set) => ({
    headerMenuExpanded: false,
    handleExpandMenu: () => {
        set({ headerMenuExpanded: true });
        console.log('handleExpandMenu');
    },
    handleCollapseMenu: () => {
        set({ headerMenuExpanded: false });
        console.log('handleCollapseMenu');
    },
}));
