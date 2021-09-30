import React from 'react';
import Row from './Row';
import { Table } from '@ui';


const List = ({ points, visiblePoints, activePoint, setPoints, setActivePoint }) => <div>
    <Table>
        <Table.Head>
            <Table.Cell size='96px'>Value</Table.Cell>
            <Table.Cell>Date and time</Table.Cell>
            <Table.Cell size='56px'/>
        </Table.Head>

        {visiblePoints.map(({ id, date, value }) => <Row
            key={id}
            id={id}
            date={date}
            value={value}
            active={activePoint?.id === id}
            points={points}
            setPoints={setPoints}
            setActivePoint={setActivePoint}
        />)}
    </Table>
</div>;

export default List;