const monthes = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};


export const formateDate = (value, format = 'D.M.y') => {
    const date = new Date(value),
        month = String(date.getUTCMonth() + 1),
        day = String(date.getUTCDate()),
        year = String(date.getUTCFullYear()),
        hour = String(date.getHours()),
        minute = String(date.getMinutes()),
        second = String(date.getSeconds());


    let result = format
        .replaceAll('month', 'X')
        .replaceAll('h', hour)
        .replaceAll('H', `0${hour}`.substr(-2))
        .replaceAll('min', minute)
        .replaceAll('MIN', `0${minute}`.substr(-2))
        .replaceAll('s', second)
        .replaceAll('S', `0${second}`.substr(-2))
        .replaceAll('d', day)
        .replaceAll('D', `0${day}`.substr(-2))
        .replaceAll('Y', year)
        .replaceAll('y', year.substr(2, 2))
        .replaceAll('m', month)
        .replaceAll('M', `0${month}`.substr(-2))
        .replaceAll('X', monthes[month]);


    return result;
}
