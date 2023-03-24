"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coletarArvoreDeDocumentoDoPassivo = void 0;
const { JSDOM } = require('jsdom');
const GetArvoreDocumento_1 = require("../GetArvoreDocumento");
const index_1 = require("../GetCapaDoPassiva/index");
const GetTextoPorXPATH_1 = require("../../helps/GetTextoPorXPATH");
const Corre_aoDoErroDeFormatoDoSapiens_1 = require("../../helps/Corre\u00E7aoDoErroDeFormatoDoSapiens");
async function coletarArvoreDeDocumentoDoPassivo(data) {
    const capaHTMLDoPassivo = await index_1.getCapaDoPassivaUseCase.execute(data.nup, data.cookie);
    const capaDoPassivoFormata = new JSDOM(capaHTMLDoPassivo);
    const xphatDaNUP_Principal = "/html/body/div/div[4]/table/tbody/tr[13]/td[2]/a[1]/b";
    try {
        data.nup = await (0, Corre_aoDoErroDeFormatoDoSapiens_1.correçaoDoErroDeFormatoDoSapiens)((0, GetTextoPorXPATH_1.getXPathText)(capaDoPassivoFormata, xphatDaNUP_Principal)).replace("(PRINCIPAL)", "").replace("-", "").replace("/", "").replace(".", "");
        return await (await GetArvoreDocumento_1.getArvoreDocumentoUseCase.execute(data)).reverse();
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.coletarArvoreDeDocumentoDoPassivo = coletarArvoreDeDocumentoDoPassivo;
//# sourceMappingURL=coletarArvoreDeDocumentoDoPassivo.js.map