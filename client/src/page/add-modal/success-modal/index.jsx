import React, { useEffect } from 'react';
import { Modal } from '@ui';
import s from './success-modal.css';

const delay = 2500;


const SuccessModal = ({ opened, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, delay);

        return () => clearTimeout(timer);
    }, [opened]);

    return <Modal opened={opened} onClose={onClose}>
        <div className={s.content}>
            <div className={s.icon}>
                <svg
                    width='81' height='81' viewBox='0 0 81 81'
                    fill='none' xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M68.4619 6.75L30.375 45.7886L12.5347 28.8765L0 41.418L30.375 70.875L81 19.2881L68.4619 6.75Z'
                        fill='#00FFA3'
                    />
                </svg>
            </div>

            <div className={s.title}>
                Your deal was
                submitted successfully!
            </div>
        </div>

    </Modal>
};

export default SuccessModal;