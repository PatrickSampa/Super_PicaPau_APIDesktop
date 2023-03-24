"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encontrarDataMaisAtual = void 0;
function encontrarDataMaisAtual(dates) {
    if (dates.length === 0) {
        return null;
    }
    const mostRecentDate = dates.reduce((currentMax, dateStr) => {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime()) && date > currentMax) {
            return date;
        }
        return currentMax;
    }, new Date(0));
    return mostRecentDate;
}
exports.encontrarDataMaisAtual = encontrarDataMaisAtual;
//# sourceMappingURL=VerificarDataMaisAtual.js.map