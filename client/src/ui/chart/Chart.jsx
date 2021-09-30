import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { getPosition, drawGraph } from './utils';


const Chart = ({ points, width, height, activePoint, setActivePoint }) => {
    const [mouse, setMouse] = useState({});

    const canvas = useRef(null),
        dpiWidth = useMemo(() => width * 2, [width]),
        dpiHeight = useMemo(() => height * 2, [height]),
        maxY = useMemo(() => points.reduce((prev, curr) => (Math.max(prev, curr?.value)), 0),[points]),
        canvasData = useMemo(() => canvas?.current?.getBoundingClientRect() || { left: 0, top: 0 }, [canvas]),
        coordinates = useMemo(() => points?.map(({ id, value }, i) => ({
            id,
            x: (dpiWidth / 9) * i,
            y: dpiHeight - ((dpiHeight / maxY) * value)
        })), [points, dpiWidth, dpiHeight, maxY]);

    const handleMouseMove = useCallback(({ clientX, clientY }) => {
        setMouse({ x: (clientX - canvasData.left) * 2, y: (clientY - canvasData.top) * 2, clientX });
    }, [canvasData]);

    const handleMouseLeave = useCallback(() => {
        setMouse({});
        setActivePoint({});
    }, []);

    useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');

        ctx && drawGraph(ctx, dpiWidth, dpiHeight, points, activePoint);
    }, [canvas, activePoint, points, dpiWidth, dpiHeight]);

    useEffect(() => {
        setActivePoint(getPosition(coordinates, dpiWidth, mouse?.x));
    }, [mouse, dpiWidth, coordinates]);


    return <canvas
        ref={canvas}
        width={dpiWidth}
        height={dpiHeight}
        style={{ width, height }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    />
}

Chart.defaultProps = {
    width: 375,
    height: 286
};

export default Chart;