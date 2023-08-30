import NavigationIcon from '@components/layout/NavigationIcon';
import { useModalStore } from '@stores/modal';
import { ReactNode } from 'react';
import './styles/Modal.css';

type Props = {
    title?: string;
    fadeBackground?: boolean;
    children?: ReactNode;
}

const Modal = ({
    fadeBackground = true,
}: Props) => {

    const modalOpen = useModalStore(state => state.modalOpen)
    const handleCloseModal = useModalStore(state => state.handleCloseModal)
    const modalContents = useModalStore(state => state.modalContents)
    const modalTitle = useModalStore(state => state.modalTitle)
    const showModalClose = useModalStore(state => state.showModalClose)


    return (
        modalOpen ? (
            <>
                <div id="modal-background"
                    onClick={handleCloseModal}
                    style={{
                        backgroundColor: !fadeBackground ? 'transparent' : undefined
                    }} />
                <div id="modal-container" onClick={handleCloseModal}>
                    <div id="modal" onClick={(e) => { e.stopPropagation() }}>
                        <div id="modal-header">
                            {showModalClose && <NavigationIcon
                                icon="X"
                                id="modal-close-container"
                                onClick={handleCloseModal} />}
                        </div>
                        <div id="modal-content">
                            <h3 id="modal-title">{modalTitle}</h3>
                            <div id="modal-body">{modalContents}</div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    )
}

export default Modal
