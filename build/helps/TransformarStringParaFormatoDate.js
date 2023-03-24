"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterDatasParaDate = void 0;
function converterDatasParaDate(texto) {
    const regex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const matches = texto.match(regex);
    if (!matches) {
        return [];
    }
    const datas = matches.map((match) => {
        const partes = match.split('/').map((parte) => parseInt(parte));
        return new Date(partes[2], partes[1] - 1, partes[0]);
    });
    return datas;
}
exports.converterDatasParaDate = converterDatasParaDate;
//# sourceMappingURL=TransformarStringParaFormatoDate.js.map