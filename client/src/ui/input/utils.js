export const parseFloatValue = value => {
    let result = value;
    result = result.replace( /\.$|[^\d.]/gi , '');

    value.slice(-1) === '.' && (result = `${result}.`);

    let arr = result.split(''),
        dot,
        startNumber;

    result = arr.filter((el) => {
        if (Number.isInteger(Number(el))) startNumber = true;

        if (el === '.' && !startNumber) return false;

        if (el === '.' && !dot) {
            dot = true;
            return true;
        }

        if (el === '.' && dot) return false;

        return true;
    }).join('');

    return result;
}

export const checkSimbol = (value, check) => value.indexOf(check) >= 0;
