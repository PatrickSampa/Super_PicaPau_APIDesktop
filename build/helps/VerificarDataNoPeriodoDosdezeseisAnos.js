"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarDataNoPeriodoDeDezesseisAnos = void 0;
function verificarDataNoPeriodoDeDezesseisAnos(dataMaisAtual, dataMenosDezesseisAnos, dataInicioPrevidenciarias, dataFimPrevidenciarias) {
    if (dataInicioPrevidenciarias >= dataMenosDezesseisAnos && dataInicioPrevidenciarias <= dataMaisAtual || dataFimPrevidenciarias >= dataMenosDezesseisAnos && dataFimPrevidenciarias <= dataMaisAtual) {
        return true;
    }
    else if (dataInicioPrevidenciarias < dataMenosDezesseisAnos && dataFimPrevidenciarias > dataMaisAtual) {
        return true;
    }
    else if (dataInicioPrevidenciarias < dataMenosDezesseisAnos && dataFimPrevidenciarias > dataMenosDezesseisAnos) {
        return true;
    }
    return false;
}
exports.verificarDataNoPeriodoDeDezesseisAnos = verificarDataNoPeriodoDeDezesseisAnos;
//# sourceMappingURL=VerificarDataNoPeriodoDosdezeseisAnos.js.map