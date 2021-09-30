import React, { useContext, useMemo } from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import { table } from './utils';
import s from './table.css';


const Row = ({ active, dense, children, onMouseMove, onMouseLeave }) => {
    const { cols, ready } = useContext(table),
        gridTemplateColumns = useMemo(() => cols.map(item => item.size).join(' '), [cols]);

    if (!ready) return null;

    return <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={classNames(s.row, {
            [s.dense]: dense,
            [s.active]: active
        })}
        style={{ gridTemplateColumns }}
    >
        {children}
    </div>;
};

Row.propTypes = {
    dense: pt.bool,
    active: pt.bool
};

Row.defaultProps = {
    dense: false,
    active: false,
    onMouseMove: () => {},
    onMouseLeave: () => {}
};

Row.displayName = 'Table.Row';

export default Row;
