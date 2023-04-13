"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
class Endereco {
    async handle(StringSislabra, CpfAutor) {
        const novaStringSislabra = StringSislabra.replace(/\s{3,}/g, ",");
        let ocorrenciasSP = [];
        const novaStringEndereço = novaStringSislabra.split("Endereços Encontrados");
        const novaStringEndereçoAtualizado = novaStringEndereço[1].split("Dados Cadastrais");
        let indiceSP = novaStringSislabra.indexOf("SP");
        while (indiceSP >= 0) {
            ocorrenciasSP.push(indiceSP);
            indiceSP = novaStringSislabra.indexOf("SP", indiceSP + 1);
        }
        if (novaStringSislabra.indexOf("Endereços Encontrados - Nenhum dado encontrado") != -1) {
            return [];
        }
        const ocorrenciasCpfAutor = [];
        let indiceCpf = novaStringSislabra.indexOf(CpfAutor);
        while (indiceCpf >= 0) {
            ocorrenciasCpfAutor.push(indiceCpf);
            indiceCpf = novaStringSislabra.indexOf(CpfAutor, indiceCpf + 1);
        }
        const str = novaStringEndereçoAtualizado[0];
        const regex = /\d+SP/g;
        const matches = str.match(regex);
        if (matches == null) {
            return [];
        }
        else if (matches) {
            for (const match of matches) {
                console.log("Match: " + match);
                const index = match.search(/[a-zA-Z]/);
                if (index !== -1) {
                    const sp = match.slice(index);
                    if (ocorrenciasCpfAutor.length > 1) {
                        return [true, true];
                    }
                    else {
                        return [true];
                    }
                }
                return [];
            }
        }
    }
}
exports.Endereco = Endereco;
//# sourceMappingURL=enderecoEncontrado.js.map