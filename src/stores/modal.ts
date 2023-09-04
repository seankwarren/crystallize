import { devLog } from '@utils/.';
import { ReactNode } from 'react';
import { create } from 'zustand';

type ModalState = {
    modalOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    modalTitle: string;
    setModalTitle: (title: string) => void;
    modalContents: ReactNode;
    setModalContents: (contents: ReactNode) => void;
    showModalClose: boolean;
    setShowModalClose: (isShown: boolean) => void;
};
export const useModalStore = create<ModalState>()((set) => ({
    modalOpen: false,
    handleOpenModal: () => {
        set({ modalOpen: true });
        devLog('handleOpenModal');
    },
    handleCloseModal: () => {
        set({ modalOpen: false });
        devLog('handleCloseModal');
    },
    modalTitle: 'Title',
    setModalTitle: (title) => {
        set({ modalTitle: title });
        devLog('setModalTitle');
    },
    modalContents: undefined,
    setModalContents: (contents) => {
        set({ modalContents: contents });
        devLog('setModalContents');
    },
    showModalClose: true,
    setShowModalClose: (isShown) => {
        set({ showModalClose: isShown });
        devLog('setsShowModalClose');
    },
}));
