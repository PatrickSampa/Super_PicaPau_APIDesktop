"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPrevidenciarias = void 0;
const GetTextoPorXPATH_1 = require("../../../helps/GetTextoPorXPATH");
const TransformarStringParaFormatoDate_1 = require("../../../helps/TransformarStringParaFormatoDate");
const BuscarDatasEmString_1 = require("../../../helps/BuscarDatasEmString");
const VerificarDataNoPeriodoDosdezeseisAnos_1 = require("../../../helps/VerificarDataNoPeriodoDosdezeseisAnos");
class DataPrevidenciarias {
    async Previdenciarias(dataAtual, dataMenosdezesseis, parginaDosPrevFormatada) {
        let tamanhoColunaPrevidenciarias = 2;
        let verificarWhilePrevidenciarias = true;
        while (verificarWhilePrevidenciarias) {
            if (typeof ((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, `/html/body/div/div[4]/table/tbody/tr[${tamanhoColunaPrevidenciarias}]`)) == 'object') {
                verificarWhilePrevidenciarias = false;
                break;
            }
            tamanhoColunaPrevidenciarias++;
        }
        for (let p = 2; p < tamanhoColunaPrevidenciarias; p++) {
            if (typeof ((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, `/html/body/div/div[4]/table/tbody/tr[${p}]`)) === 'string') {
                const xpathColunaPrevidenciarias = `/html/body/div/div[4]/table/tbody/tr[${p}]`;
                const xpathCoulaFormatadoPrevidenciarias = (0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, xpathColunaPrevidenciarias);
                if (xpathCoulaFormatadoPrevidenciarias.indexOf("Empregado") !== -1 || xpathCoulaFormatadoPrevidenciarias.indexOf("Contribuinte Individual") !== -1) {
                    const datasEmprego = (0, TransformarStringParaFormatoDate_1.converterDatasParaDate)((0, BuscarDatasEmString_1.ordenarDatas)((0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, xpathColunaPrevidenciarias)));
                    const impeditivoBoolean = (0, VerificarDataNoPeriodoDosdezeseisAnos_1.verificarDataNoPeriodoDeDezesseisAnos)(dataAtual, dataMenosdezesseis, datasEmprego[0], datasEmprego[1]);
                    if (impeditivoBoolean) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
exports.DataPrevidenciarias = DataPrevidenciarias;
//# sourceMappingURL=GetInformationPrecidenciasForPicaPau.js.map