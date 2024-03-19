import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ReactNode } from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.modalClose} onClick={onClose}>
                    <img className={styles.cancel} src="https://cdn-user-icons.flaticon.com/134727/134727323/1710786834463.svg?token=exp=1710787819~hmac=eff1c1d7c46495f5aaf12a139b2d27bc" alt="cancel" />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};
export default Modal