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
        console.log('handleOpenModal');
    },
    handleCloseModal: () => {
        set({ modalOpen: false });
        console.log('handleCloseModal');
    },
    modalTitle: 'Title',
    setModalTitle: (title) => {
        set({ modalTitle: title });
        console.log('setModalTitle');
    },
    modalContents: undefined,
    setModalContents: (contents) => {
        set({ modalContents: contents });
        console.log('setModalContents');
    },
    showModalClose: true,
    setShowModalClose: (isShown) => {
        set({ showModalClose: isShown });
    },
}));
