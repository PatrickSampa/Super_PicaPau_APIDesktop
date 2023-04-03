"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtrairAnoMaisAtual = void 0;
function SubtrairAnoMaisAtual(dataMaisAtual, anos) {
    const data = new Date(dataMaisAtual);
    data.setFullYear(data.getFullYear() + anos);
    return data;
}
exports.SubtrairAnoMaisAtual = SubtrairAnoMaisAtual;
//# sourceMappingURL=subtrairAnoAtual.js.map