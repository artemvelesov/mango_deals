import React from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import s from './table.css';


const Cell = ({ size, align, children }) => <div
    className={classNames(s.cell, s[align])}
    data-align={align}
    data-size={size}
>
    <div className={s.data}>
        {children}
    </div>
</div>;


Cell.propTypes = {
    size: pt.string,
    align: pt.oneOf(['left', 'center', 'right']),
};

Cell.defaultProps = {
    size: '1fr',
    align: 'left',
};

Cell.displayName = 'Table.Cell';

export default Cell;
