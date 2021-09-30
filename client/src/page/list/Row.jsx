import React, { useCallback } from 'react';
import classNames from 'classnames';
import { formateDate } from '@tools/datetime';
import { Table } from '@ui';
import s from './list.css';


const TrashIcon = () => <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M6 8H18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V8Z' stroke='#EB5757' strokeWidth='2'/>
    <rect x='3' y='7' width='18' height='2' rx='1' fill='#EB5757'/>
    <rect x='9' y='4' width='6' height='4' rx='1' stroke='#EB5757' strokeWidth='2'/>
    <rect x='9' y='11' width='2' height='6' fill='#EB5757'/>
    <rect x='13' y='11' width='2' height='6' fill='#EB5757'/>
</svg>


const Row = ({ id, points, setPoints, active, date, value, setActivePoint }) => {
    const handleHover = useCallback(() => setActivePoint({ id }), [id]),
        handleMouseLeave = useCallback(() => setActivePoint({}), []),
        removePoint = useCallback(() => setPoints(points.filter(point => point.id !== id)),[points, id]);


    return <Table.Row
        active={active}
        onMouseMove={handleHover}
        onMouseLeave={handleMouseLeave}
    >
        <Table.Cell>
            <div className={classNames(s.value, active && s.active)}>
                {value.toFixed(2)}
            </div>
        </Table.Cell>

        <Table.Cell>
            <div className={classNames(s.date, active && s.active)}>
                {formateDate(date, 'D month Y H:MIN:S')}
            </div>
        </Table.Cell>

        <Table.Cell>
            {active && <div className={s.icon} onClick={removePoint}>
                <TrashIcon />
            </div>}
        </Table.Cell>
    </Table.Row>;
}


export default Row;