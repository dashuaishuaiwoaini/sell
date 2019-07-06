// 存储到localStorage
// __seller__:{
//     id1: {
//         key: value
//     },id2: {
//         key: value
//     }
// }
export function setDate(id, key, value) {
    if (!window.localStorage.__seller__) {
        var seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(window.localStorage.__seller__);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.setItem('__seller__', JSON.stringify(seller));
};

// 从localStorage里获取数据

export function getDate(id, key) {
    var seller = window.localStorage.getItem('__seller__');
    if (seller) {
        seller = JSON.parse(seller);
        if (seller[id]) {
            return seller[id][key];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

// url解析

export function urlParse() {
    let url = window.location.href;
    let urlSearch = url.indexOf('?') > -1 ? url.slice(url.indexOf('?')) : null;
    let obj = {};
    if (urlSearch) {
        let reg = /[?&][^?&]+=[^?&]+/g;
        let arr = urlSearch.match(reg);
        for (let i in arr) {
            let curArr = arr[i].slice(1).split('=');
            obj[curArr[0]] = curArr[1];
        }
    }
    return obj;
};
