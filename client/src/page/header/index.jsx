import React from 'react';
import logo from './logo.png';
import { Button } from '@ui';
import s from './header.css';


const Header = ({ onOpenModal }) => {
    return <div className={s.container}>
        <img src={logo} className={s.logo} alt='Mango deals' />

        <div className={s.action}>
            <Button onClick={onOpenModal}>
                New Deal
            </Button>
        </div>
    </div>;
};

export default Header;