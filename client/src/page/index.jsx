import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
// import useRequest from '@tools/hooks/request';
import { Chart } from '@ui';
import { getElementSize } from '@tools/dom'
import Table from './list';
import Header from './header';
import AddModal from './add-modal';
import s from './page.css';

const testData = [
    { id: 'dasd23322332', value: 1.00, date: '21 Jul 2021 14:31:01' },
    { id: 'da2d23wq22332', value: 4.00, date: '22 Jul 2021 14:32:01' },
    { id: 'da2d32222332', value: 12.00, date: '23 Jul 2021 14:32:01' },
    { id: 'da12123322332', value: 4.00, date: '24 Jul 2021 14:32:01' },
    { id: 'ads23d23d', value: 20.00, date: '21 Jul 2021 14:31:01' },
    { id: 'wd23d23d', value: 4.00, date: '22 Jul 2021 14:32:01' },
    { id: 'dwsd22323', value: 1.00, date: '23 Jul 2021 14:32:01' },
    { id: 'sadadasd223', value: 10.00, date: '24 Jul 2021 14:32:01' },
    { id: 'sadad223', value: 7.00, date: '24 Jul 2021 14:32:01' }
]


const Page = () => {
    const [points, setPoints] = useState(testData),
        visiblePoints = useMemo(() => points?.slice(-10), [points]),
        $chart = useRef(null),
        { width = 375, height = 286 } = useMemo(() => getElementSize($chart.current), [$chart?.current]),
        [activePoint, setActivePoint] = useState({}),
        [modal, setModal] = useState(false);

    // Демонстрация примера загрузки данных с сервера при наличии API
    // const { request, fetching } = useRequest(),
    //     fetchData = useCallback(async () => {
    //         const { res, err } = await request({ url: '/api/deals'});
    //
    //         res && setPoints(res);
    //         err && console.log(err);
    //     }, []);

    // useEffect(() => fetchData(), []);

    return <div className={s.layout}>
        <Header onOpenModal={() => setModal(true)} />

        <div className={s.content}>
            <div className={s.chart} ref={$chart}>
                <Chart
                    height={height}
                    width={width}
                    points={visiblePoints}
                    activePoint={activePoint}
                    setActivePoint={setActivePoint}
                />
            </div>

            <Table
                points={points}
                visiblePoints={visiblePoints}
                setPoints={setPoints}
                activePoint={activePoint}
                setActivePoint={setActivePoint}
            />
        </div>

        <AddModal
            opened={modal}
            points={points}
            setPoints={setPoints}
            onClose={() => setModal(false)}
        />
    </div>;
};

export default Page;