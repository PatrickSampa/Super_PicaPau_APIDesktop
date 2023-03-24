"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Litispedencia = void 0;
const GetTextoPorXPATH_1 = require("../../../helps/GetTextoPorXPATH");
class Litispedencia {
    async funcLitis(parginaDosPrevFormatada) {
        const xpathRelacaoProcesso = "/html/body/div/div[2]/table/tbody/tr[2]/td";
        const xpathRelacaoProcessoFormatada = ((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, xpathRelacaoProcesso).trim());
        const StringParaVerificar = "Não há relação dos processos movidos pelo autor contra o INSS.";
        const xpathRelacaoProcessoMovidosFormatada = xpathRelacaoProcessoFormatada === StringParaVerificar;
        return xpathRelacaoProcessoMovidosFormatada;
    }
}
exports.Litispedencia = Litispedencia;
//# sourceMappingURL=getInformationLitispendenciaForPicaPau.js.map