"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationForPicaPau = void 0;
const GetInformationAdvogadoPilantra_1 = require("./GetInformationAdvogadoPilantra");
class InformationForPicaPau {
    constructor(advogadosObj) { }
    ;
    async Impedimentos(capaHTML) {
        const arrayImpedimentos = [];
        const verificarAdvogadoBoolean = await GetInformationAdvogadoPilantra_1.advogados.AdvogadoPilantra(capaHTML);
        if (!verificarAdvogadoBoolean) {
            arrayImpedimentos.push("ADVOGADO");
        }
        return arrayImpedimentos;
    }
}
exports.InformationForPicaPau = InformationForPicaPau;
//# sourceMappingURL=GetInformationCapaForPicaPau.js.map