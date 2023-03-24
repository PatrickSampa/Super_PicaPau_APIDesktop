"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformaçoesIniciasDosBeneficios = void 0;
const Corre_aoDoErroDeFormatoDoSapiens_1 = require("../../helps/Corre\u00E7aoDoErroDeFormatoDoSapiens");
const GetTextoPorXPATH_1 = require("../../helps/GetTextoPorXPATH");
async function getInformaçoesIniciasDosBeneficios(paginaHTML_DOSPREV_Formatada) {
    const result = [];
    const valorMaximoparaPecoorerALinha = 20;
    const valorDaLinhaInicial = 2;
    for (let indexDaLinha = valorDaLinhaInicial; indexDaLinha <= valorMaximoparaPecoorerALinha; indexDaLinha++) {
        const xpathDaLinhaParaOElementoTipo = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[6]";
        const tipo = (0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoTipo);
        const tipoNaoEncontrado = tipo == null;
        if (tipoNaoEncontrado) {
            const lidoTodosOsBeneficios = result.length > 0;
            if (lidoTodosOsBeneficios) {
                break;
            }
            else {
                continue;
            }
        }
        const verificaçaoDaInValidadeDoTipo = !(tipo == "ATIVO" || tipo == "CESSADO");
        if (verificaçaoDaInValidadeDoTipo) {
            continue;
        }
        const xpathDaLinhaParaOElementoNB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[1]";
        const nb = (0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoNB);
        const xpathDaLinhaParaOElementoBeneficio = "/html/body/div/div[3]/table//tr[" + indexDaLinha + "]/td[2]";
        const beneficio = (0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoBeneficio);
        const xpathDaLinhaParaOElementoDIB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[4]";
        const dib = (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDIB));
        const xpathDaLinhaParaOElementoDCB = "/html/body/div/div[3]/table/tbody/tr[" + indexDaLinha + "]/td[5]";
        const dcb = (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDCB));
        result.push({ tipo, nb, beneficio, dib, dcb });
    }
    return await result;
}
exports.getInformaçoesIniciasDosBeneficios = getInformaçoesIniciasDosBeneficios;
//# sourceMappingURL=getInforma%C3%A7oesIniciasDosBeneficios.js.map