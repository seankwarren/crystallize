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
        console.log('toggleRightSidebar');
    },
    rightSidebarWidth: 200,
    setRightSidebarWidth: (width) => {
        set({ rightSidebarWidth: width });
    },
    handleMinimize: () => {
        console.log('handleMinimize');
    },
    handleMaximize: () => {
        console.log('handleMaximize');
    },
    handleClose: () => {
        console.log('handleClose');
    },
}));
