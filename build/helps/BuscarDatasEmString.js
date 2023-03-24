"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenarDatas = void 0;
function ordenarDatas(str) {
    const regex = /(\d{2}\/\d{2}\/\d{4})|(\d{2}\/\d{4})/g;
    const dates = [];
    let match;
    while ((match = regex.exec(str))) {
        dates.push(match[0]);
    }
    dates.sort((a, b) => {
        const dateA = new Date(a.replace('/', '-'));
        const dateB = new Date(b.replace('/', '-'));
        return dateA.getTime() - dateB.getTime();
    });
    if (dates[1].length == 7) {
        const data = dates[1];
        dates[1] = `01/` + data;
    }
    const d = dates.join(',');
    return d;
}
exports.ordenarDatas = ordenarDatas;
//# sourceMappingURL=BuscarDatasEmString.js.map