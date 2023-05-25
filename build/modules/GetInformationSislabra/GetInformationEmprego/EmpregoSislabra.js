"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprego = void 0;
const fs = require("fs");
const HeadPdf_1 = require("../../GetPdfSislabra/GetPdfSislabra/HeadPdf");
class Emprego {
    async handle(StringSislabra, cpfAutor) {
        function extrairDados(texto) {
            const padrao = /\d{2}\/\d{2}\/\d{4}[^]*?(?=\d{2}\/\d{2}\/\d{4}|\b[a-zA-Z]+\b|$)/g;
            const matches = texto.matchAll(padrao);
            const dados = [];
            for (const match of matches) {
                dados.push(match[0].trim());
            }
            return dados;
        }
        function formatarValor(valor) {
            const padraoData = /^\d{2}\/\d{2}\/\d{4}/;
            const valorSemData = valor.replace(padraoData, '').trim();
            return valorSemData;
        }
        const ocorrenciasCpfAutor = [];
        const novaSislabra = StringSislabra.replace(/\s{3,}/g, ",");
        let indiceCpf = novaSislabra.indexOf(cpfAutor);
        while (indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaSislabra.indexOf(cpfAutor, indiceCpf + 1);
        }
        console.log("lang" + ocorrenciasCpfAutor.length);
        const valores = await (0, HeadPdf_1.lePdf)();
        if (valores == null) {
            return [];
        }
        for (let j = 0; j < valores.length; j++) {
            if (parseFloat(valores[j].replace(".", "").replace(",", ".")) > 3000) {
                console.log("1 trueeeeeeeeeeeeee");
                if (ocorrenciasCpfAutor.length > 1) {
                    return [true, true];
                }
                else {
                    console.log("2 trueeeeeeeeeeeeee");
                    return [true];
                }
            }
        }
        return [];
    }
}
exports.Emprego = Emprego;
//# sourceMappingURL=empregoSislabra.js.map