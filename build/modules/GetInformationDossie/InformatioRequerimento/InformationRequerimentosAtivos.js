"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasRequerimentoAtivo = void 0;
const GetTextoPorXPATH_1 = require("../../../helps/GetTextoPorXPATH");
class DatasRequerimentoAtivo {
    async handle(parginaDosPrevFormatada) {
        let tamanhoColunasRequerimentos = 2;
        const arrayDatas = [];
        let verificarWhileRequerimentos = true;
        while (verificarWhileRequerimentos) {
            if (typeof ((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, `/html/body/div/div[3]/table/tbody/tr[${tamanhoColunasRequerimentos}]`)) == 'object') {
                verificarWhileRequerimentos = false;
                break;
            }
            tamanhoColunasRequerimentos++;
        }
        for (let t = 2; t < tamanhoColunasRequerimentos; t++) {
            if (typeof ((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, `/html/body/div/div[3]/table/tbody/tr[${t}]`)) === 'string') {
                const xpathColunaRequerimentos = `/html/body/div/div[3]/table/tbody/tr[${t}]`;
                const xpathCoulaFormatadoRequerimentos = (0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, xpathColunaRequerimentos);
                if (xpathCoulaFormatadoRequerimentos.indexOf("ATIVO") !== -1) {
                    console.log("ENTROU");
                    return true;
                }
            }
        }
        return false;
    }
}
exports.DatasRequerimentoAtivo = DatasRequerimentoAtivo;
//# sourceMappingURL=InformationRequerimentosAtivos.js.map