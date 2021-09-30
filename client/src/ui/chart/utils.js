export const drawGrid = (ctx, w, h) => {
    const rowsCount = 6,
        colsCount = 12,
        axiosRowHeight = h / rowsCount,
        axiosColWeight = w / colsCount;


    if (rowsCount){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(235, 245, 248, 0.05)';

        for (let i = 1; i <= rowsCount; i++) {
            const y = ((axiosRowHeight * i) - axiosRowHeight);

            ctx.moveTo(0, y );
            ctx.lineTo(w, y );
        }
        ctx.stroke();
        ctx.closePath();
    }

    if (colsCount){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(235, 245, 248, 0.05)';

        for (let i = 1; i <= colsCount; i++) {
            const x = ((axiosColWeight * i) - axiosColWeight) ;

            ctx.moveTo(x , 0);
            ctx.lineTo(x, h );
        }
        ctx.stroke();
        ctx.closePath();
    }
}


export const drawCircle = ({ ctx, x, y, radius, stroke, fill }) => {
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fill;
    ctx.fill()
    ctx.stroke();
};


export const drawLine = ({ ctx, start, finish, color, width = 2 }) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(finish.x, finish.y);
    ctx.stroke();
    ctx.closePath();
};


export const drawPosition = (ctx, w, h, x, y) => {
    drawLine({ ctx, start: { x, y: h }, finish: { x, y: 0 }, color: '#346D8D' });
    drawLine({ ctx, start: { x: 0, y }, finish: { x: w, y }, color: '#346D8D' });

    drawCircle({ ctx, x, y, radius: 24, stroke: 'rgba(0,0,0,0)', fill: 'rgba(132, 211, 255, 0.33)' });
    drawCircle({ ctx, x, y, radius: 10.29, stroke: '#84D3FF', fill: '#84D3FF' });
    drawCircle({ ctx, x, y, radius: 6.86, stroke: '#fff', fill: '#fff' });
};


export const getPosition = (points = [], w, x) => (points?.reduce((prev, curr) => {
    return Math.abs(curr?.x - x) <= Math.abs(prev?.x - x) ? curr : prev;
}, { x: 0 }));


export const drawGraph = (ctx, w, h, points, activePoint) => {
    ctx.clearRect(0, 0, w, h);

    const maxY = points.reduce((maxY, current) => (Math.max(maxY, current.value)), 0),
        step =  h / maxY,
        result = points.map(({ value, id }, i) => ({
            id,
            x: (w / 9) * i,
            y: h - (value * step)
        }));

    drawGrid(ctx, w, h);

    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#00A3FF';
    result.forEach(({ x, y }, i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.stroke();


    if (activePoint?.id) {
        const point = result.find(({ id }) => activePoint.id === id);

        point && drawPosition(ctx, w, h, point.x, point.y);
    }
};