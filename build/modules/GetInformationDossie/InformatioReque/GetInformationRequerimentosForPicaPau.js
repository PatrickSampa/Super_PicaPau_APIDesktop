"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasRequerimento = void 0;
const GetTextoPorXPATH_1 = require("../../../helps/GetTextoPorXPATH");
const FiltrarDatas_1 = require("../../../helps/FiltrarDatas");
const VerificarDataMaisAtual_1 = require("../../../helps/VerificarDataMaisAtual");
const subtrairanoAtual_1 = require("../../../helps/subtrairanoAtual");
class DatasRequerimento {
    async dataRequerimento(parginaDosPrevFormatada) {
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
                if (xpathCoulaFormatadoRequerimentos.indexOf("INDEFERIDO") !== -1) {
                    const date = (0, FiltrarDatas_1.extractDatesFromString)(xpathCoulaFormatadoRequerimentos);
                    arrayDatas.push(...date);
                }
            }
        }
        const dataAtual = (0, VerificarDataMaisAtual_1.encontrarDataMaisAtual)(arrayDatas);
        const dataMenosdezesseis = (0, subtrairanoAtual_1.SubtrairAnoMaisAtual)(dataAtual, -16);
        return [dataAtual, dataMenosdezesseis];
    }
}
exports.DatasRequerimento = DatasRequerimento;
//# sourceMappingURL=GetInformationRequerimentosForPicaPau.js.map