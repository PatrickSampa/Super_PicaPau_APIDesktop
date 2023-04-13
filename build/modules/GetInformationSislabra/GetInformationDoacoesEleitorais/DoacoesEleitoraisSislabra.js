"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoacoesEleitorais = void 0;
class DoacoesEleitorais {
    async hundle(StringSislabra, cpfAutor) {
        const ocorrenciasCpfAutor = [];
        const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");
        let indiceCpf = novaSislabra.indexOf(cpfAutor);
        while (indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaSislabra.indexOf(cpfAutor, indiceCpf + 1);
        }
        if (novaSislabra.indexOf("Doações Eleitorais Realizadas - Nenhum dado encontrado") != -1) {
            return [];
        }
        else {
            if (ocorrenciasCpfAutor.length > 1) {
                return [true, true];
            }
            else {
                return [true];
            }
        }
    }
}
exports.DoacoesEleitorais = DoacoesEleitorais;
//# sourceMappingURL=DoacoesEleitoraisSislabra.js.map