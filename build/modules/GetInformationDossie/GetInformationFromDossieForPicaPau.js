"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationDossieForPicaPau = void 0;
const InformatioRequerimento_1 = require("./InformatioRequerimento");
const InformationPrevidenciarias_1 = require("./InformationPrevidenciarias");
const GetInformationIdade_1 = require("./GetInformationIdade");
const GetInformationLitispendencia_1 = require("./GetInformationLitispendencia");
const GetInformationSeguradoEspecial_1 = require("./GetInformationSeguradoEspecial");
const InformatioRequerimento_2 = require("./InformatioRequerimento");
class GetInformationDossieForPicaPau {
    async impedimentos(paginaDosprevFormatada, parginaDosPrev) {
        const ArrayImpedimentos = [];
        try {
            const DatasAtualEMenosDezesseis = await InformatioRequerimento_1.requerimentos.dataRequerimento(paginaDosprevFormatada);
            if (DatasAtualEMenosDezesseis[0] == null) {
                ArrayImpedimentos.push("AUSÊNCIA DE REQUERIMENTO AUTOR");
            }
            else {
                const verificarDataFinal = await InformationPrevidenciarias_1.dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
                if (verificarDataFinal) {
                    ArrayImpedimentos.push("EMPREGO");
                }
            }
        }
        catch (_a) {
            ArrayImpedimentos.push("VÍNCULO ABERTO");
        }
        const verificarIdade = await GetInformationIdade_1.calcularIdade.calcIdade(paginaDosprevFormatada);
        if (verificarIdade.length == 0) {
            ArrayImpedimentos.push("IDADE INDEFINIDA");
        }
        else if (!verificarIdade[0] && verificarIdade.length != 0) {
            ArrayImpedimentos.push("IDADE");
        }
        const verificarLitispedencia = await GetInformationLitispendencia_1.litispendencia.funcLitis(paginaDosprevFormatada);
        if (!verificarLitispedencia) {
            ArrayImpedimentos.push("LITISPENDÊNCIA");
        }
        const segurado = await GetInformationSeguradoEspecial_1.seguradoEspecial.handle(parginaDosPrev);
        const requerimentoAtivo = await InformatioRequerimento_2.requerimentosAtivos.handle(paginaDosprevFormatada);
        if (segurado !== -1 || requerimentoAtivo == true) {
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR");
        }
        return ArrayImpedimentos;
    }
}
exports.GetInformationDossieForPicaPau = GetInformationDossieForPicaPau;
//# sourceMappingURL=GetInformationFromDossieForPicaPau.js.map