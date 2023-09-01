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
        import.meta.env.MODE === 'production' && console.log('handleOpenModal');
    },
    handleCloseModal: () => {
        set({ modalOpen: false });
        import.meta.env.MODE === 'production' &&
            console.log('handleCloseModal');
    },
    modalTitle: 'Title',
    setModalTitle: (title) => {
        set({ modalTitle: title });
        import.meta.env.MODE === 'production' && console.log('setModalTitle');
    },
    modalContents: undefined,
    setModalContents: (contents) => {
        set({ modalContents: contents });
        import.meta.env.MODE === 'production' &&
            console.log('setModalContents');
    },
    showModalClose: true,
    setShowModalClose: (isShown) => {
        set({ showModalClose: isShown });
    },
}));
