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
        import.meta.env.MODE === 'production' &&
            console.log('handleExpandMenu');
    },
    handleCollapseMenu: () => {
        set({ headerMenuExpanded: false });
        import.meta.env.MODE === 'production' &&
            console.log('handleCollapseMenu');
    },
}));
