import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { table } from './utils';
import s from './table.css';


const Table = ({ children, hover }) => {
    const [cols, setCols] = useState([]),
        ready = useRef(false);

    const value = useMemo(() => ({
        ready: ready.current,
        cols,
        setCols: value => {
            ready.current = true;
            setCols(value);
        }
    }), [cols]);

    return <div className={classNames(s.table, { [s.hover]: hover })}>
        <table.Provider value={value}>
            {children}
        </table.Provider>
    </div>;
};


export default Table;
