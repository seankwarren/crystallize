import { useModalStore } from '@stores/modal';

const useModalControls = () => {
    const handleOpenModal = useModalStore((state) => state.handleOpenModal);
    const setModalTitle = useModalStore((state) => state.setModalTitle);
    const setModalContents = useModalStore((state) => state.setModalContents);
    const setShowModalClose = useModalStore((state) => state.setShowModalClose);

    return {
        handleOpenModal,
        setModalTitle,
        setModalContents,
        setShowModalClose,
    };
};

export default useModalControls;
