import React, { useState, useCallback, useEffect } from 'react';
import { generateId } from '@tools/helpers';
import { formateDate } from '@tools/datetime';
import { Modal, Button, Input } from '@ui';
import SuccessModal from './success-modal';
import CloseIcon from './CloseIcon';
import s from './add-modal.css';


const AddModal = ({ opened, points, setPoints, onClose }) => {
    const [date, setDate] = useState(new Date()),
        [value, setValue] = useState(0),
        [success, setSuccess] = useState(false);

    const handleSubmit = useCallback(() => {
        const point = {
            date: String(date),
            value: Number(value),
            id: generateId()
        };

        setPoints([...points, point]);

        onClose();
        setSuccess(true);
    }, [points, date, value]);

    useEffect(() => {
        setValue(0);
        setDate(new Date());
    }, [opened]);


    return <>
        <Modal opened={opened} onClose={onClose}>
            <div className={s.container}>
                <div className={s.form}>
                    <div className={s.title}>
                        Make a New Deal

                        <div className={s.close} onClick={onClose}>
                            <CloseIcon />
                        </div>
                    </div>

                    <div className={s.field}>
                        <div className={s.label}>Current Date</div>
                        <Input value={formateDate(date, 'D month Y H:MIN')} disabled />
                    </div>

                    <div className={s.field}>
                        <div className={s.label}>Enter value</div>
                        <Input value={value} type='float' onChange={setValue} />
                    </div>
                </div>

                <div className={s.footer}>
                    <div className={s.actions}>
                        <Button size='middle' onClick={handleSubmit}>Proceed</Button>
                    </div>
                </div>
            </div>
        </Modal>

        <SuccessModal opened={success} onClose={() => setSuccess(false)} />
    </ >;
};

export default AddModal;