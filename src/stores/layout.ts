import { defaultSidebarWidth } from '@components/layout/styles/styles';
import { devLog } from '@utils/.';
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
        // devLog('toggleLeftSidebar');
    },
    leftSidebarWidth: defaultSidebarWidth,
    setLeftSidebarWidth: (width) => {
        console.log(width);
        set({ leftSidebarWidth: width });
        // devLog('setLeftSidebarWidth');
    },
    rightSidebarOpen: false,
    toggleRightSidebar: () => {
        set((state) => ({
            rightSidebarOpen: !state.rightSidebarOpen,
        }));
        devLog('toggleRightSidebar');
    },
    rightSidebarWidth: 200,
    setRightSidebarWidth: (width) => {
        set({ rightSidebarWidth: width });
        devLog('setRightSidebarWidth');
    },
    handleMinimize: () => {
        devLog('handleMinimize');
    },
    handleMaximize: () => {
        devLog('handleMaximize');
    },
    handleClose: () => {
        devLog('handleClose');
    },
}));
