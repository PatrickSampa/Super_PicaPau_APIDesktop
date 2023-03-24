"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fazerInformationsForCalculeDTO = void 0;
async function fazerInformationsForCalculeDTO(beneficios, numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao, id) {
    var result = { beneficio: "", dibAnterior: "", beneficioAcumuladoBoolean: false, dibInicial: "", dip: "", id: id, nb: "", rmi: "", tipo: "", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao };
    result = await preencherBeneficioPrincipal(result, beneficios[0]);
    for (let beneficio of beneficios) {
        if (beneficio.nb == result.nb) {
            continue;
        }
        const beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim = result.tipo != "ATIVO" && beneficio.tipo == "ATIVO";
        const beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP = result.tipo == beneficio.tipo && beneficio.dip != beneficio.dib;
        if (beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim || beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP) {
            result = preencherBeneficioPrincipal(result, beneficio);
        }
    }
    beneficios = beneficios.filter(beneficios => beneficios.nb != result.nb);
    const beneficiosAcumulados = await converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(beneficios);
    result.beneficiosAcumulados = beneficiosAcumulados;
    result.beneficioAcumuladoBoolean = beneficiosAcumulados.length > 0;
    return await result;
}
exports.fazerInformationsForCalculeDTO = fazerInformationsForCalculeDTO;
function preencherBeneficioPrincipal(result, beneficio) {
    result.beneficio = beneficio.beneficio;
    result.dip = beneficio.dip;
    result.dibInicial = beneficio.dib;
    result.dibFinal = beneficio.dcb;
    result.dibAnterior = beneficio.dibAnterior;
    result.rmi = beneficio.rmi;
    result.nb = beneficio.nb;
    result.tipo = beneficio.tipo;
    return result;
}
async function converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(beneficios) {
    var beneficiosAcumulados = [];
    for (let beneficio of beneficios) {
        beneficiosAcumulados.push({ beneficio: beneficio.beneficio, dcb: beneficio.dcb, dib: beneficio.dib, rmi: beneficio.rmi });
    }
    return await beneficiosAcumulados;
}
//# sourceMappingURL=contruirInformationsForCalcule.js.map