"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imoveisSp = void 0;
function imoveisSp(StringSislabra, cpfAutor) {
    const ocorrenciasCpfAutor = [];
    const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");
    let indiceCpf = novaSislabra.indexOf(cpfAutor);
    while (indiceCpf >= 0) {
        ocorrenciasCpfAutor.push(indiceCpf);
        indiceCpf = novaSislabra.indexOf(cpfAutor, indiceCpf + 1);
    }
    if (novaSislabra.indexOf("Imóveis na Cidade de SP - Nenhum dado encontrado") != -1) {
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
exports.imoveisSp = imoveisSp;
//# sourceMappingURL=imoveisSaopaulo.js.map