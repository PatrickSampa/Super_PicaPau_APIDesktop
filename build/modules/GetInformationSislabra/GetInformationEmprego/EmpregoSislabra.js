"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprego = void 0;
class Emprego {
    async hundle(StringSislabra, ProcurarCpfAutor) {
        const ArrayVerificarAutor = [];
        const ocorrenciasCpfAutor = [];
        let verificarDoisAutor = 0;
        const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");
        const novaStringparaAcharNome = novaSislabra.split("CPF");
        let indiceCpf = novaSislabra.indexOf(ProcurarCpfAutor);
        while (indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaSislabra.indexOf(ProcurarCpfAutor, indiceCpf + 1);
        }
        if (StringSislabra.indexOf('Situação Empresa') != -1) {
            if (ocorrenciasCpfAutor.length > 1) {
                ArrayVerificarAutor.push(true, true, verificarDoisAutor);
                return ArrayVerificarAutor;
            }
            ArrayVerificarAutor.push(true);
            return ArrayVerificarAutor;
        }
        ArrayVerificarAutor.push(false);
        return ArrayVerificarAutor;
    }
}
exports.Emprego = Emprego;
//# sourceMappingURL=EmpregoSislabra.js.map