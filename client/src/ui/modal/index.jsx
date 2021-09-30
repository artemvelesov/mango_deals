import React from 'react';
import s from './modal.css';


const Modal = ({ opened, children, onClose }) => {
    if (!opened) return null;


    return <div className={s.container}>
        <div className={s.overlay} onClick={onClose} />

        <div className={s.content}>
            {children}
        </div>
    </div>;
};

Modal.defaultProps = {
    opened: false,
    onClose : () => {}
}

export default Modal;