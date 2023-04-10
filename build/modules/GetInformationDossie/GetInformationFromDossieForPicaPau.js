"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationDossieForPicaPau = void 0;
const InformatioReque_1 = require("./InformatioReque");
const InformationPro_1 = require("./InformationPro");
const GetInformationIdade_1 = require("./GetInformationIdade");
const GetInformationLitispendencia_1 = require("./GetInformationLitispendencia");
const GetInformationSeguradoEspecial_1 = require("./GetInformationSeguradoEspecial");
const InformatioReque_2 = require("./InformatioReque");
class GetInformationDossieForPicaPau {
    async impedimentos(paginaDosprevFormatada, parginaDosPrev) {
        const ArrayImpedimentos = [];
        try {
            const DatasAtualEMenosDezesseis = await InformatioReque_1.requerimentos.dataRequerimento(paginaDosprevFormatada);
            console.log("Data Requerimento: " + DatasAtualEMenosDezesseis.length);
            if (DatasAtualEMenosDezesseis[0] == null) {
                ArrayImpedimentos.push("IDADE SEM GÊNERO");
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
        const verificarIdade = await GetInformationIdade_1.calcularIdade.calcIdade(paginaDosprevFormatada);
        if (!verificarIdade[0] && verificarIdade.length != 0) {
            ArrayImpedimentos.push("IDADE");
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
exports.GetInformationDossieForPicaPau = GetInformationDossieForPicaPau;
//# sourceMappingURL=GetInformationFromDossieForPicaPau.js.map