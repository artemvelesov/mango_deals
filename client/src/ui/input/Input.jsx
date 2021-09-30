import React, { useCallback, useEffect, useRef, useState } from 'react';
import pt from 'prop-types';
import { isPrintable, keyCodes } from '@tools/keycodes';
import { parseFloatValue, checkSimbol } from './utils';
import s from './input.css';


const Input = props => {
    const {
        name, disabled, autoComplete, autofocus, type,
        maxValue, readonly, maxLength, value: external, placeholder,
        onEnter, onChange
    } = props;

    const [value, setValue] = useState(external),
        [showText, setShowText] = useState(false),
        $field = useRef(null),
        htmlType = type === 'number' ? 'text' : type;

    const handleChange = useCallback(event => {
        let result = event.target.value;

        if (type === 'number') {
            result = Number(result.replace(/[^\d]/g, ''));
        }

        if (type === 'float') {
            result = parseFloatValue(result);

            Number(result) > maxValue && (result = maxValue);
        }

        setValue(result);
        onChange(result);
    },[type, onChange]);

    const handleKeyDown = useCallback(event => {
        const withMetaKey = event.ctrlKey || event.shiftKey || event.metaKey,
            numberKeys = !withMetaKey && isPrintable(event.which) && /[^\d]/.test(event.key)

        if (type === 'number' && numberKeys){
            event.preventDefault();
        }

        if (type === 'float' && numberKeys && (checkSimbol($field.current?.value, '.') && event.key === '.')){
            event.preventDefault();
        }

        if (event.keyCode === keyCodes.enter) {
            onEnter();
        }
    },[type]);

    useEffect(() => {
        setValue(external);
    }, [external]);

    return <div className={s.container}>
        <input
            autoComplete={autoComplete ? 'on' : 'off'}
            autoFocus={autofocus}
            className={s.input}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            readOnly={readonly}
            maxLength={maxLength}
            ref={$field}
            type={type === 'password' ? showText ? 'text' : type : htmlType}
            size={1}
            value={value}
            style={mask && {
                 paddingRight: (mask.length * 12) + 12
            }}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />
    </div>;
};

Input.defaultProps = {
    value: '',
    onChange: () => {},
    onEnter: () => {},
};

Input.propTypes = {
    name: pt.string,
    disabled: pt.bool,
    autoFocus: pt.bool,
    type: pt.oneOf(['text', 'password', 'number', 'float']),
    onEnter: pt.func,
    onChange: pt.func,
    onFocus: pt.func,
    onBlur: pt.func
};

export default Input;