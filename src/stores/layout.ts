import { create } from 'zustand';

type LayoutState = {
    leftSidebarOpen: boolean;
    toggleLeftSidebar: () => void;
    leftSidebarWidth: number;
    setLeftSidebarWidth: (width: number) => void;
    rightSidebarOpen: boolean;
    toggleRightSidebar: () => void;
    rightSidebarWidth: number;
    setRightSidebarWidth: (width: number) => void;
    handleMinimize: () => void;
    handleMaximize: () => void;
    handleClose: () => void;
};
export const useLayoutStore = create<LayoutState>()((set) => ({
    leftSidebarOpen: false,
    toggleLeftSidebar: () => {
        set((state) => ({
            leftSidebarOpen: !state.leftSidebarOpen,
        }));
        import.meta.env.MODE === 'production' &&
            console.log('toggleLeftSidebar');
    },
    leftSidebarWidth: 200,
    setLeftSidebarWidth: (width) => {
        set({ leftSidebarWidth: width });
    },
    rightSidebarOpen: false,
    toggleRightSidebar: () => {
        set((state) => ({
            rightSidebarOpen: !state.rightSidebarOpen,
        }));
        import.meta.env.MODE === 'production' &&
            console.log('toggleRightSidebar');
    },
    rightSidebarWidth: 200,
    setRightSidebarWidth: (width) => {
        set({ rightSidebarWidth: width });
    },
    handleMinimize: () => {
        import.meta.env.MODE === 'production' && console.log('handleMinimize');
    },
    handleMaximize: () => {
        import.meta.env.MODE === 'production' && console.log('handleMaximize');
    },
    handleClose: () => {
        import.meta.env.MODE === 'production' && console.log('handleClose');
    },
}));
