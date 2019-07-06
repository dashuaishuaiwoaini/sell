export function formatDate(date, fmt) {
    let DATE = new Date(date);
    let dateObj = {
        'Y+': DATE.getFullYear(),
        'M+': DATE.getMonth() + 1,
        'D+': DATE.getDate(),
        'h+': DATE.getHours(),
        'm+': DATE.getMinutes(),
        's+': DATE.getSeconds()
    };
    for (let i in dateObj) {
        if (new RegExp(`(${i})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, supplyZero(dateObj[i], RegExp.$1.length));
        }
    }
    return fmt;

    function supplyZero(value, length) {
        return ('00' + value).slice(-length);
    }
};
