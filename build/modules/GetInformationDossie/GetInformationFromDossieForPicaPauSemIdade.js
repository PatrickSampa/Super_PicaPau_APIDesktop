"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationDossieForPicaPauSemIdade = void 0;
const InformatioReque_1 = require("./InformatioReque");
const InformationPro_1 = require("./InformationPro");
const GetInformationLitispendencia_1 = require("./GetInformationLitispendencia");
const GetInformationSeguradoEspecial_1 = require("./GetInformationSeguradoEspecial");
const InformatioReque_2 = require("./InformatioReque");
class GetInformationDossieForPicaPauSemIdade {
    async impedimentos(paginaDosprevFormatada, parginaDosPrev) {
        const ArrayImpedimentos = [];
        try {
            const DatasAtualEMenosDezesseis = await InformatioReque_1.requerimentos.dataRequerimento(paginaDosprevFormatada);
            if (DatasAtualEMenosDezesseis[0] == null) {
                ArrayImpedimentos.push("AUSÊNCIA DE REQUERIMENTO AUTOR");
            }
            else {
                const verificarDataFinal = await InformationPro_1.dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
                if (verificarDataFinal) {
                    ArrayImpedimentos.push("EMPREGO");
                }
            }
        }
        catch (_a) {
            ArrayImpedimentos.push("ERRO DOSPREV EMPREGO");
        }
        const verificarLitispedencia = await GetInformationLitispendencia_1.litispendencia.funcLitis(paginaDosprevFormatada);
        if (!verificarLitispedencia) {
            ArrayImpedimentos.push("LITISPÊNDENCIA");
        }
        const segurado = await GetInformationSeguradoEspecial_1.seguradoEspecial.handle(parginaDosPrev);
        const requerimentoAtivo = await InformatioReque_2.requerimentosAtivos.handle(paginaDosprevFormatada);
        if (segurado !== -1 || requerimentoAtivo == true) {
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR");
        }
        return ArrayImpedimentos;
    }
}
exports.GetInformationDossieForPicaPauSemIdade = GetInformationDossieForPicaPauSemIdade;
//# sourceMappingURL=GetInformationFromDossieForPicaPauSemIdade.js.map