"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationDossieForPicaPau = void 0;
const InformatioReque_1 = require("./InformatioReque");
const InformationPro_1 = require("./InformationPro");
const GetInformationIdade_1 = require("./GetInformationIdade");
const GetInformationLitispendencia_1 = require("./GetInformationLitispendencia");
const GetInformationSeguradoEspecial_1 = require("./GetInformationSeguradoEspecial");
class GetInformationDossieForPicaPau {
    async impedimentos(paginaDosprevFormatada, parginaDosPrev) {
        const ArrayImpedimentos = [];
        const DatasAtualEMenosDezesseis = await InformatioReque_1.requerimentos.dataRequerimento(paginaDosprevFormatada);
        const verificarDataFinal = await InformationPro_1.dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
        if (verificarDataFinal) {
            ArrayImpedimentos.push("EMPREGO");
        }
        const verificarIdade = await GetInformationIdade_1.calcularIdade.calcIdade(paginaDosprevFormatada);
        if (!verificarIdade) {
            ArrayImpedimentos.push("IDADE");
        }
        const verificarLitispedencia = await GetInformationLitispendencia_1.litispendencia.funcLitis(paginaDosprevFormatada);
        if (!verificarLitispedencia) {
            ArrayImpedimentos.push("LITISPÊNDENCIA");
        }
        const segurado = await GetInformationSeguradoEspecial_1.seguradoEspecial.handle(parginaDosPrev);
        if (segurado !== -1) {
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR");
        }
        return ArrayImpedimentos;
    }
}
exports.GetInformationDossieForPicaPau = GetInformationDossieForPicaPau;
//# sourceMappingURL=GetInformationFromDossieForPicaPau.js.map