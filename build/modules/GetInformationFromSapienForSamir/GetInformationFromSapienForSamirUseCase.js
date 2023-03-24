"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationFromSapienForSamirUseCase = void 0;
const { JSDOM } = require('jsdom');
const GetUsuario_1 = require("../GetUsuario");
const LoginUsuario_1 = require("../LoginUsuario");
const GetTarefa_1 = require("../GetTarefa");
const index_1 = require("../GetArvoreDocumento/index");
const GetDocumento_1 = require("../GetDocumento");
const UpdateEtiqueta_1 = require("../UpdateEtiqueta");
const GetTextoPorXPATH_1 = require("../../helps/GetTextoPorXPATH");
const verifica_aoSeDosPrevInvalido_1 = require("./verifica\u00E7aoSeDosPrevInvalido");
const coletarArvoreDeDocumentoDoPassivo_1 = require("./coletarArvoreDeDocumentoDoPassivo");
const GetCapaDoPassiva_1 = require("../GetCapaDoPassiva");
const GetInformationCapa_1 = require("../GetInformationCapa");
const GetInformationDossie_1 = require("../GetInformationDossie");
class GetInformationFromSapienForSamirUseCase {
    async execute(data) {
        const cookie = await LoginUsuario_1.loginUseCase.execute(data.login);
        const usuario = (await GetUsuario_1.getUsuarioUseCase.execute(cookie));
        const usuario_id = `${usuario[0].id}`;
        let response = [];
        let responseForPicaPau = [];
        try {
            const tarefas = await GetTarefa_1.getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });
            for (var i = 0; i <= tarefas.length - 1; i++) {
                console.log("Qantidade faltando triar", (tarefas.length - i));
                const tarefaId = tarefas[i].id;
                const objectGetArvoreDocumento = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id };
                let arrayDeDocumentos;
                try {
                    arrayDeDocumentos = (await index_1.getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();
                }
                catch (error) {
                    console.log(error);
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                    continue;
                }
                var objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                var objectDosPrevNaoExisti = objectDosPrev == null;
                if (objectDosPrevNaoExisti) {
                    arrayDeDocumentos = await (0, coletarArvoreDeDocumentoDoPassivo_1.coletarArvoreDeDocumentoDoPassivo)(objectGetArvoreDocumento);
                    objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                    objectDosPrevNaoExisti = objectDosPrev == null;
                    if (objectDosPrevNaoExisti) {
                        console.log("DOSPREV NÃO ECONTRADO");
                        (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }));
                        continue;
                    }
                }
                const dosPrevSemIdParaPesquisa = (objectDosPrev.documentoJuntado.componentesDigitais.length) <= 0;
                if (dosPrevSemIdParaPesquisa) {
                    console.log("DOSPREV COM FALHA NA PESQUISA");
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                    continue;
                }
                const idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                const parginaDosPrev = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                const parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                const xpathInformacaoDeCabeçalho = "/html/body/div/p[2]/b[1]";
                const informacaoDeCabeçalho = (0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatada, xpathInformacaoDeCabeçalho);
                const informacaoDeCabeçalhoNaoExiste = !informacaoDeCabeçalho;
                if (informacaoDeCabeçalhoNaoExiste) {
                    console.log("DOSPREV INVALIDO");
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }));
                    continue;
                }
                if ((0, verifica_aoSeDosPrevInvalido_1.VerificaçaoSeDosPrevInvalido)(informacaoDeCabeçalho)) {
                    console.log("DOSPREV INVALIDO");
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }));
                    continue;
                }
                let impedCapa = await GetInformationCapa_1.impedimentosCapa.Impedimentos(await GetCapaDoPassiva_1.getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                responseForPicaPau.push(...impedCapa);
                let impedDossie = await GetInformationDossie_1.getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                responseForPicaPau.push(...impedDossie);
                if (responseForPicaPau.length == 0) {
                    await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "PROCESSO LIMPOO", tarefaId });
                }
                else {
                    let etiquetaFinal = "";
                    for (let j = 0; j < responseForPicaPau.length; j++) {
                        etiquetaFinal += responseForPicaPau[j] + " ,\n";
                    }
                    let lastCommaIndex = etiquetaFinal.lastIndexOf(',');
                    etiquetaFinal = etiquetaFinal.slice(0, lastCommaIndex);
                    const Imp = "IMPEDITIVOS: ";
                    await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: `${Imp}${etiquetaFinal.slice(0, etiquetaFinal.length - 1)}`, tarefaId });
                }
                responseForPicaPau = [];
            }
            return await response;
        }
        catch (error) {
            console.log(error);
            console.log(response.length);
            if (response.length > 0) {
                return await response;
            }
            else {
                new error;
            }
        }
    }
}
exports.GetInformationFromSapienForSamirUseCase = GetInformationFromSapienForSamirUseCase;
//# sourceMappingURL=GetInformationFromSapienForSamirUseCase.js.map