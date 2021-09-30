import React, { useContext, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { table } from './utils';
import s from './table.css';


const Head = ({ children }) => {
    const ref = useRef(null),
        { ready, cols, setCols } = useContext(table),
        gridTemplateColumns = useMemo(() => cols.map(item => item.size).join(' '), [cols]);

    useEffect(() => {
        let cols = [...ref.current?.childNodes].map($node => ({
            size: $node.dataset.size,
            align: $node.dataset.align
        }));

        setCols(cols);
    }, [children]);

    return <div
        ref={ref}
        className={classNames(s.head, !ready && s.hidden)}
        style={{ gridTemplateColumns }}
    >
        {children}
    </div>;
};

Head.displayName = 'Table.Head';

export default Head;
