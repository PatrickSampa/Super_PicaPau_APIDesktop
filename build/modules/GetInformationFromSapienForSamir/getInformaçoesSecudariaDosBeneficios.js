"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformaçoesSecudariaDosBeneficios = void 0;
const Corre_aoDoErroDeFormatoDoSapiens_1 = require("../../helps/Corre\u00E7aoDoErroDeFormatoDoSapiens");
const GetTextoPorXPATH_1 = require("../../helps/GetTextoPorXPATH");
async function getInformaçoesSecudariaDosBeneficios(beneficios, paginaHTML_DOSPREV_Formatada) {
    const numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 6;
    const numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 5;
    const numeroMaxioParaProcurarATabelaDoBeneeficio = 50;
    const numeroInicialParaProcurarATabelaDoBeneeficio = 1;
    for (let idexDoBeneficio = 0; idexDoBeneficio < beneficios.length; idexDoBeneficio++) {
        for (let idexDaDivParaPesquisarAtabela = numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela <= numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela++) {
            for (let indexDaTabela = numeroInicialParaProcurarATabelaDoBeneeficio; indexDaTabela <= numeroMaxioParaProcurarATabelaDoBeneeficio; indexDaTabela++) {
                const xpathNbDaTabela = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tbody/tr[2]/td[2]";
                const nb = (0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathNbDaTabela);
                const divInvalidaParaPesquisa = ((nb == null));
                if (divInvalidaParaPesquisa) {
                    break;
                }
                const nb_EstaDiferenteDoBeneficio = nb != beneficios[idexDoBeneficio].nb;
                if (nb_EstaDiferenteDoBeneficio) {
                    continue;
                }
                const xphatRMI = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[2]/tbody/tr[2]/td[1]";
                const rmi = (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xphatRMI));
                beneficios[idexDoBeneficio].rmi = rmi;
                const xpathDIP = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tbody/tr[2]/td[8]";
                const dip = (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDIP));
                beneficios[idexDoBeneficio].dip = dip;
                const xpathDibAnterior = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[2]/tbody/tr[2]/td[6]";
                const dibAnterior = (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(paginaHTML_DOSPREV_Formatada, xpathDibAnterior));
                beneficios[idexDoBeneficio].dibAnterior = dibAnterior;
                idexDaDivParaPesquisarAtabela = numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
                indexDaTabela = numeroMaxioParaProcurarATabelaDoBeneeficio;
            }
        }
    }
    return await beneficios;
}
exports.getInformaçoesSecudariaDosBeneficios = getInformaçoesSecudariaDosBeneficios;
//# sourceMappingURL=getInforma%C3%A7oesSecudariaDosBeneficios.js.map