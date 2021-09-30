import React from 'react';
import classNames from 'classnames';
import pt from 'prop-types';
import s from './button.css';


const Button = ({ color, children, name, disabled, block, size, variant, type, onClick }) => <button
    className={classNames(s.button, s[color], s[size], {
        [s.block]: block,
        [s.text]: variant === 'text',
        [s.outline]: variant === 'outline'
    })}
    name={name}
    disabled={disabled}
    type={type}
    onClick={onClick}
>
    {children}
</button>;

Button.defaultProps = {
    color: 'blue',
    size: 'small',
    variant: 'default'
};

Button.propTypes = {
    name: pt.string,
    size: pt.oneOf(['small', 'middle']),
    color: pt.oneOf(['blue']),
    variant: pt.oneOf(['default', 'opacity']),
    disabled: pt.bool,
    type: pt.string,
    onChange: pt.func
};

export default Button;