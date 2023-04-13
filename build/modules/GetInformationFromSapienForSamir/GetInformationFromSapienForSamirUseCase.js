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
const coletarArvoreDeDocumentoDoPassivo_1 = require("./coletarArvoreDeDocumentoDoPassivo");
const GetCapaDoPassiva_1 = require("../GetCapaDoPassiva");
const GetInformationCapa_1 = require("../GetInformationCapa");
const GetInformationDossie_1 = require("../GetInformationDossie");
const GetInformationSislabra_1 = require("../GetInformationSislabra");
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
                const arrayDosIDParaBuscarpdf = [];
                const arrayIdSislabra = [];
                const paginaCapaFormatada = new JSDOM(await GetCapaDoPassiva_1.getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                let objectDosPrev = "";
                var procurarDossies = arrayDeDocumentos.filter(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                var objectDosPrevNaoExisti = procurarDossies[0] == null;
                if (objectDosPrevNaoExisti) {
                    arrayDeDocumentos = await (0, coletarArvoreDeDocumentoDoPassivo_1.coletarArvoreDeDocumentoDoPassivo)(objectGetArvoreDocumento);
                    procurarDossies[0] = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                    objectDosPrevNaoExisti = procurarDossies[0] == null;
                    if (objectDosPrevNaoExisti) {
                        console.log("DOSPREV NÃO ECONTRADO");
                        (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }));
                        continue;
                    }
                }
                const dosPrevSemIdParaPesquisa = (procurarDossies[0].documentoJuntado.componentesDigitais.length) <= 0;
                if (dosPrevSemIdParaPesquisa) {
                    console.log("DOSPREV COM FALHA NA PESQUISA");
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                    continue;
                }
                let idDosprevParaPesquisaId = procurarDossies[0].documentoJuntado.componentesDigitais[0].id;
                let parginaDosPrevParaId = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisaId });
                let parginaDosPrevFormatadaParaId = new JSDOM(parginaDosPrevParaId);
                let idDosprevParaPesquisa = "";
                let parginaDosPrev = "";
                let parginaDosPrevFormatada = "";
                let idProcurarPoloAtivo = 1;
                let whileVerificar = true;
                let CpfAutor = "";
                while (whileVerificar) {
                    const tabelasProcurarAtivo = (0, GetTextoPorXPATH_1.getXPathText)(paginaCapaFormatada, `html/body/div/div[6]/table/tbody/tr[${idProcurarPoloAtivo}]`);
                    const regex = /\s{3}/;
                    const tabelasProcurarAtivoSemEspaco = tabelasProcurarAtivo.replace(regex, ",");
                    if (tabelasProcurarAtivoSemEspaco.indexOf("REQUERENTE (PÓLO ATIVO)") != -1) {
                        whileVerificar = false;
                        const indiceAbertura = tabelasProcurarAtivoSemEspaco.indexOf("(");
                        const indiceFechamento = tabelasProcurarAtivoSemEspaco.indexOf(")");
                        if (indiceAbertura !== -1 && indiceFechamento !== -1 && indiceAbertura < indiceFechamento) {
                            const conteudoEntreParenteses = tabelasProcurarAtivoSemEspaco.substring(indiceAbertura + 1, indiceFechamento);
                            const numerosSemPontos = conteudoEntreParenteses.replace(/\.|-/g, "");
                            CpfAutor = numerosSemPontos;
                        }
                    }
                    idProcurarPoloAtivo++;
                }
                let IdDosErroCatch = "";
                const xpatgCpfAutor = '/html/body/div/div[1]/table/tbody/tr[7]/td';
                const verificarCpfParaEntrarNoIf = (0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatadaParaId, xpatgCpfAutor);
                if (verificarCpfParaEntrarNoIf != CpfAutor) {
                    try {
                        for (let j = 0; j < procurarDossies.length; j++) {
                            IdDosErroCatch = procurarDossies[j];
                            let idDos = procurarDossies[j].documentoJuntado.componentesDigitais[0].id;
                            let novoObjetoDos = procurarDossies[j];
                            let parginaDosPrevParaverificar = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDos });
                            let parginaDosPrevFormatadaVerificar = new JSDOM(parginaDosPrevParaverificar);
                            let verificarCpf = (0, GetTextoPorXPATH_1.getXPathText)(parginaDosPrevFormatadaVerificar, xpatgCpfAutor);
                            if (verificarCpf == CpfAutor) {
                                console.log("Entrou");
                                objectDosPrev = novoObjetoDos;
                                idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                                parginaDosPrev = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                                parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                                break;
                            }
                        }
                    }
                    catch (_a) {
                        var objectDosPrevNaoExisti = IdDosErroCatch == null;
                        if (objectDosPrevNaoExisti) {
                            arrayDeDocumentos = await (0, coletarArvoreDeDocumentoDoPassivo_1.coletarArvoreDeDocumentoDoPassivo)(objectGetArvoreDocumento);
                            IdDosErroCatch = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                            objectDosPrevNaoExisti = IdDosErroCatch == null;
                            if (objectDosPrevNaoExisti) {
                                console.log("DOSPREV NÃO ECONTRADO");
                                (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }));
                                continue;
                            }
                        }
                        const dosPrevSemIdParaPesquisa = (IdDosErroCatch.documentoJuntado.componentesDigitais.length) <= 0;
                        if (dosPrevSemIdParaPesquisa) {
                            console.log("DOSPREV COM FALHA NA PESQUISA");
                            (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                            continue;
                        }
                        objectDosPrev = IdDosErroCatch;
                        idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                        parginaDosPrev = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                        parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                    }
                }
                else {
                    objectDosPrev = procurarDossies[0];
                    idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                    parginaDosPrev = await GetDocumento_1.getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                    parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                }
                var objDosis = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - ANEXADO" && Documento.documentoJuntado.tipoDocumento.sigla == "PESBEN");
                var objDosis2 = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - AUTOR");
                var objDosis3 = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - POSSÍVEL CÔNJUGE OU COMPANHEIRO");
                if (objDosis[0] != undefined) {
                    arrayIdSislabra.push(objDosis[0]);
                }
                if (objDosis2[0] != undefined) {
                    arrayIdSislabra.push(objDosis2[0]);
                }
                if (objDosis3[0] != undefined) {
                    arrayIdSislabra.push(objDosis3[0]);
                }
                if (arrayIdSislabra.length <= 0) {
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "SISLABRA NÃO ENCONTRADO", tarefaId }));
                    continue;
                }
                if (arrayIdSislabra.length > 2) {
                    (await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "FALHA AO EXAMINAR SISLABRA", tarefaId }));
                    continue;
                }
                if (arrayIdSislabra.length == 1) {
                    const idParaBuscarIdSislabra1 = arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                    arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1);
                }
                else {
                    const idParaBuscarIdSislabra1 = arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                    const idParaBuscarIdSislabra2 = arrayIdSislabra[1].documentoJuntado.componentesDigitais[0].id;
                    arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1, idParaBuscarIdSislabra2);
                }
                let impedCapa = await GetInformationCapa_1.impedimentosCapa.Impedimentos(await GetCapaDoPassiva_1.getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                responseForPicaPau.push(...impedCapa);
                let impedDossie = await GetInformationDossie_1.getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                responseForPicaPau.push(...impedDossie);
                let impedSislabra = await GetInformationSislabra_1.getInformationSislabraForPicaPau.impedimentos(arrayDosIDParaBuscarpdf, cookie, CpfAutor);
                responseForPicaPau.push(...impedSislabra);
                if (responseForPicaPau.length == 0) {
                    await UpdateEtiqueta_1.updateEtiquetaUseCase.execute({ cookie, etiqueta: "PROCESSO LIMPO", tarefaId });
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