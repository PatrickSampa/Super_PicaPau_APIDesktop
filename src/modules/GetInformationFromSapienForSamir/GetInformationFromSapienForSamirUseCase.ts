const { JSDOM } = require('jsdom');
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index';
import { IInformationsForCalculeDTO } from '../../DTO/InformationsForCalcule';
import { getDocumentoUseCase } from '../GetDocumento';
import { updateEtiquetaUseCase } from '../UpdateEtiqueta';
import { getXPathText } from "../../helps/GetTextoPorXPATH";
import { coletarCitacao } from "./coletarCitacao";
import { VerificaçaoSeDosPrevInvalido } from "./verificaçaoSeDosPrevInvalido";
import { getInformaçoesIniciasDosBeneficios } from './getInformaçoesIniciasDosBeneficios';
import { getInformaçoesSecudariaDosBeneficios } from './getInformaçoesSecudariaDosBeneficios';
import { fazerInformationsForCalculeDTO } from './contruirInformationsForCalcule';
import { ResponseArvoreDeDocumento } from '../../sapiensOperations/response/ResponseArvoreDeDocumento';
import { coletarArvoreDeDocumentoDoPassivo } from './coletarArvoreDeDocumentoDoPassivo';
import { getCapaDoPassivaUseCase } from '../GetCapaDoPassiva';
import { correçaoDoErroDeFormatoDoSapiens } from '../../helps/CorreçaoDoErroDeFormatoDoSapiens';
import { formatoNomeAdvogadoPilantra } from '../../helps/formatoNomeAdvogadoPilantra';
//import { advogadoPilantra } from '../GetInformationCapa/advogadoPilantra';
//import { calcIdade } from '../GetInformationCapa/VerificarIdade';
//import { litispedencia } from '../../helps/verificarLitispedencia';
import { da } from 'date-fns/locale';
import {impedimentosCapa } from '../GetInformationCapa';
//import { IdentificarAdvogadoPilantra, VerificarIdadeCapa } from '../GetInformationCapa/GetInformationCapaForPicaPau';
import { extractDatesFromString } from '../../helps/FiltrarDatas';
import { encontrarDataMaisAtual } from '../../helps/VerificarDataMaisAtual';
import { ordenarDatas } from '../../helps/BuscarDatasEmString';
import { verificarDataNoPeriodoDeDezesseisAnos } from '../../helps/VerificarDataNoPeriodoDosdezeseisAnos';
import { converterDatasParaDate } from '../../helps/TransformarStringParaFormatoDate';
import { getInformationDossieForPicaPau } from '../GetInformationDossie';
import { readPDF } from '../GetPdfSislabra/ReadPdf';
import { downloadPDFWithCookies,  deletePDF } from '../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau';
/* import { verificarArraySislabra } from '../GetInformationSislabra/GetInformationEmprego/EmpregoSislabra';
import { impeditivoVeiculo } from '../GetInformationSislabra/GetInformationVeiculo/VeículoSislabra';
import { enderecosEncontrados } from '../GetInformationSislabra/GetInformationEndereco/enderecoEncontrado';
import { doacoesEleitorais } from '../GetInformationSislabra/GetInformationDoacoesEleitorais/DoacoesEleitoraisSislabra';
import { imoveisSp } from '../GetInformationSislabra/GetInformationImoveis/imoveisSaopaulo'; */
import { getInformationSislabraForPicaPau } from '../GetInformationSislabra';

export class GetInformationFromSapienForSamirUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        // console.log("teste")
        // const teste = await getUsuarioUseCase.execute("PHPSESSID:f29006e787410cd44bc088093391ba7b")
        // console.log(teste)
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;

        let response: Array<IInformationsForCalculeDTO> = [];
        let responseForPicaPau: Array<String> = [];
        
        try {
            const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });

            for (var i = 0; i <= tarefas.length - 1; i++) {
                console.log("Qantidade faltando triar", (tarefas.length - i));
                const tarefaId = tarefas[i].id;
                const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                let arrayDeDocumentos: ResponseArvoreDeDocumento[];

                try {
                    arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();
                } catch (error) {
                    console.log(error);
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                    continue
                }



                const arrayDosIDParaBuscarpdf: Array<number> = [];
                const arrayIdSislabra:Array<any> = [];
                const paginaCapaFormatada = new JSDOM(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie))

                /* const arraySislabraAutor: Array<number> = []; */
                let objectDosPrev: any = "";
                var procurarDossies = arrayDeDocumentos.filter(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                //console.log(objectDosPrev2[0].documentoJuntado.componentesDigitais[0].id)






                var objectDosPrevNaoExisti = procurarDossies[0] == null;
                if (objectDosPrevNaoExisti) {
                    arrayDeDocumentos = await coletarArvoreDeDocumentoDoPassivo(objectGetArvoreDocumento)
                    procurarDossies[0] = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                    objectDosPrevNaoExisti =procurarDossies[0] == null;
                    if (objectDosPrevNaoExisti) {
                        console.log("DOSPREV NÃO ECONTRADO");
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                        continue;
                    }
                }




                const dosPrevSemIdParaPesquisa = (procurarDossies[0].documentoJuntado.componentesDigitais.length) <= 0;
                if (dosPrevSemIdParaPesquisa) {
                    console.log("DOSPREV COM FALHA NA PESQUISA");
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }))
                    continue;
                }
                let idDosprevParaPesquisaId: any = procurarDossies[0].documentoJuntado.componentesDigitais[0].id;
                let parginaDosPrevParaId = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisaId });

                let parginaDosPrevFormatadaParaId = new JSDOM(parginaDosPrevParaId);




                let idDosprevParaPesquisa: any = "";
                let parginaDosPrev: any = "";
                let parginaDosPrevFormatada:any = "";

                //Buscar o Cpf na capa
                let idProcurarPoloAtivo: number = 1; 
                let whileVerificar = true;
                let CpfAutor = "";
                while(whileVerificar){
                    const tabelasProcurarAtivo = getXPathText(paginaCapaFormatada, `html/body/div/div[6]/table/tbody/tr[${idProcurarPoloAtivo}]`)
                    const regex = /\s{3}/;
                    const tabelasProcurarAtivoSemEspaco = tabelasProcurarAtivo.replace(regex, ",");
                    //console.log(tabelasProcurarAtivoSemEspaco);
                    if( tabelasProcurarAtivoSemEspaco.indexOf("REQUERENTE (PÓLO ATIVO)") != -1){
                        //console.log(tabelasProcurarAtivoSemEspaco)
                        whileVerificar = false;
                        const indiceAbertura = tabelasProcurarAtivoSemEspaco.indexOf("("); // encontra o índice da primeira ocorrência do parêntese aberto
                        const indiceFechamento = tabelasProcurarAtivoSemEspaco.indexOf(")"); // encontra o índice da primeira ocorrência do parêntese fechado
                        if (indiceAbertura !== -1 && indiceFechamento !== -1 && indiceAbertura < indiceFechamento) {
                            const conteudoEntreParenteses = tabelasProcurarAtivoSemEspaco.substring(indiceAbertura + 1, indiceFechamento); // extrai o conteúdo entre os parênteses
                            const numerosSemPontos = conteudoEntreParenteses.replace(/\.|-/g, "");
                            /* console.log(numerosSemPontos)
                            console.log("PASSOU AQUI 1 VEZES") */
                            CpfAutor = numerosSemPontos;
                            
                          }
                    }
                    idProcurarPoloAtivo++;
                }
                //

                let IdDosErroCatch: any = ""
                const xpatgCpfAutor = '/html/body/div/div[1]/table/tbody/tr[7]/td';
                const verificarCpfParaEntrarNoIf = getXPathText(parginaDosPrevFormatadaParaId, xpatgCpfAutor)

                if(verificarCpfParaEntrarNoIf != CpfAutor){
                    //console.log('entrou')
                    try{
                    
                        for(let j=0; j<procurarDossies.length; j++){
                            IdDosErroCatch = procurarDossies[j];
                            let idDos = procurarDossies[j].documentoJuntado.componentesDigitais[0].id;
                            let novoObjetoDos =  procurarDossies[j];
                            let parginaDosPrevParaverificar = await getDocumentoUseCase.execute({ cookie, idDocument: idDos });
                            let parginaDosPrevFormatadaVerificar = new JSDOM(parginaDosPrevParaverificar);
                            let verificarCpf = getXPathText(parginaDosPrevFormatadaVerificar, xpatgCpfAutor)
                            if(verificarCpf == CpfAutor){
                                console.log("Entrou")
                                objectDosPrev = novoObjetoDos;
                                idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                                parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                                parginaDosPrevFormatada = new JSDOM(parginaDosPrev);                                      
                                break;
                            }
                            
                        }
                        
                    }catch{
                            var objectDosPrevNaoExisti = IdDosErroCatch == null;
                        if (objectDosPrevNaoExisti) {
                            arrayDeDocumentos = await coletarArvoreDeDocumentoDoPassivo(objectGetArvoreDocumento)
                            IdDosErroCatch = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                            objectDosPrevNaoExisti =IdDosErroCatch == null;
                            if (objectDosPrevNaoExisti) {
                                console.log("DOSPREV NÃO ECONTRADO");
                                (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                                continue;
                            }
                        }
    
    
    
    
                        const dosPrevSemIdParaPesquisa = (IdDosErroCatch.documentoJuntado.componentesDigitais.length) <= 0;
                        if (dosPrevSemIdParaPesquisa) {
                            console.log("DOSPREV COM FALHA NA PESQUISA");
                            (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }))
                            continue;
                        }

                        objectDosPrev = IdDosErroCatch;
                        idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                        parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });

                        parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                    }
                }else{
                    //console.log('entrou')
                     objectDosPrev = procurarDossies[0];
                     idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                     parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });

                     parginaDosPrevFormatada = new JSDOM(parginaDosPrev);
                }
    
                //console.log(objectDosPrev.documentoJuntado.componentesDigitais[0].id)
                
                
                
                var objDosis: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - ANEXADO" && Documento.documentoJuntado.tipoDocumento.sigla == "PESBEN");
                var objDosis2: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - AUTOR");
                var objDosis3: any = arrayDeDocumentos.filter(Documento => Documento.movimento == "JUNTADA DE DOCUMENTO - SISLABRA - POSSÍVEL CÔNJUGE OU COMPANHEIRO");
                
                if(objDosis[0] != undefined){
                    arrayIdSislabra.push(objDosis[0]);
                }
                if(objDosis2[0] != undefined){
                    arrayIdSislabra.push(objDosis2[0])
                }
                if(objDosis3[0] != undefined){
                    arrayIdSislabra.push(objDosis3[0])
                }
                /* const idParaBuscarIdSislabra1: number = objDosis[0].documentoJuntado.componentesDigitais[0].id;
                const idParaBuscarIdSislabra2: number = objDosis[1].documentoJuntado.componentesDigitais[0].id; */
                

                /* arrayIdSislabra.push(...objDosis, ...objDosis2, ...objDosis3); */

                if(arrayIdSislabra.length <= 0){
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "SISLABRA NÃO ENCONTRADO", tarefaId }))
                        continue;
                }
                /* console.log(arrayIdSislabra)
                console.log("Juntada documento - anexADO:" + objDosis)
                console.log("JUNTADA DE DOCUMENTO - SISLABRA - AUTOR" + objDosis2)
                console.log(arrayIdSislabra.length) */
                
                if(arrayIdSislabra.length>2){
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "FALHA AO EXAMINAR SISLABRA", tarefaId }))
                        continue;
                }

                if(arrayIdSislabra.length==1){
                     const idParaBuscarIdSislabra1 = arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                     arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1);
                }else{
                     const idParaBuscarIdSislabra1= arrayIdSislabra[0].documentoJuntado.componentesDigitais[0].id;
                     const idParaBuscarIdSislabra2 = arrayIdSislabra[1].documentoJuntado.componentesDigitais[0].id;
                     arrayDosIDParaBuscarpdf.push(idParaBuscarIdSislabra1, idParaBuscarIdSislabra2);
                }
                //console.log(arrayDosIDParaBuscarpdf);
                
                



            
             
                
                
                
                
                
               
               
                
                //console.log(pathNomeAutorFormatado)
                /* var VerificarAutorMaisDeUmaAutorEmpresa: number = 0;
                var VerificarAutorMaisDeUmaConjugeEmpresa: number = 0;
                var VerificarAutorMaisDeUmaAutorVeiculo: number = 0;
                var VerificarAutorMaisDeUmaConjugeVeiculo: number = 0;
                var VerificarAutorMaisDeUmaAutorEndereco: number = 0;
                var VerificarAutorMaisDeUmaConjugeEndereco: number = 0;
                var VerificarAutorMaisDeUmaAutorDoacoes: number = 0;
                var VerificarAutorMaisDeUmaConjugeDoacoes : number = 0;
                var VerificarAutorMaisDeUmaAutorImoveis: number = 0;
                var VerificarAutorMaisDeUmaConjugeImoveis : number = 0; */

                    /* for(let i=0; i<arrayDosIDParaBuscarpdf.length; i++){
                        //console.log(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`)
                        await downloadPDFWithCookies(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`,cookie)
                        .then(() => console.log('PDF downloaded successfully!'))
                        .catch((error) => console.error('Error downloading PDF:', error));
                        console.log("Entrou aqui")
                        try{
                            console.log("aqui")
                        const pdf = await readPDF('build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf') */
                        
                        /* Ative quando for para produção
                        const pdf = await readPDF('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf') */
                        

                            /* //VERIFICAÇÃO IMPEDITIVO EMPRESA
                            const impedEmprego: Array<boolean> = verificarArraySislabra(pdf, CpfAutor);
                            if(impedEmprego.length >= 2 && VerificarAutorMaisDeUmaAutorEmpresa < 1){
                                VerificarAutorMaisDeUmaAutorEmpresa++;
                                responseForPicaPau.push("Empresa autor")
                            }else if(impedEmprego[0] == true && VerificarAutorMaisDeUmaConjugeEmpresa < 1 && impedEmprego.length < 2){
                                VerificarAutorMaisDeUmaConjugeEmpresa++;
                                responseForPicaPau.push("Empresa cônjuge")
                            }else{
                                console.log("Não tem impeditivo empresa")
                            }


                            //VERIFICAÇÃO IMPEDITIVO VEÍCULO
                            const impeditivoVeiculoBolean: Array<any> = impeditivoVeiculo(pdf, CpfAutor);
                            console.log("AQUI NO FOR " +impeditivoVeiculoBolean)
                            if(impeditivoVeiculoBolean.length > 1 && VerificarAutorMaisDeUmaAutorVeiculo < 1){
                                console.log("VEICULO AUTOR")
                                console.log(impeditivoVeiculoBolean.length)
                                VerificarAutorMaisDeUmaAutorVeiculo++
                                responseForPicaPau.push("VEICULO AUTOR")
                            }else if(impeditivoVeiculoBolean.length == 1 && impeditivoVeiculoBolean[0] == true && VerificarAutorMaisDeUmaConjugeVeiculo < 1){
                                console.log("VEICULO cônjuge")
                                VerificarAutorMaisDeUmaConjugeVeiculo++;
                                responseForPicaPau.push("VEICULO cônjuge")
                            }


                            //VERIFICAÇÃO IMPEDITIVO ENDERECO
                            const enderecosBolean:Array<boolean> = enderecosEncontrados(pdf, CpfAutor);
                            if(enderecosBolean.length > 1 && VerificarAutorMaisDeUmaAutorEndereco < 1){
                                VerificarAutorMaisDeUmaAutorEndereco++;
                                responseForPicaPau.push(" Cidade Autor")
                            }else if(enderecosBolean.length == 1 && VerificarAutorMaisDeUmaConjugeEndereco < 1){
                                VerificarAutorMaisDeUmaConjugeEndereco++;
                                responseForPicaPau.push("cidade Cônjuge")
                            }


                            //VERIFICAR DOAÇOES ELEITORAIS
                            const doacoesSislabra = doacoesEleitorais(pdf, CpfAutor);
                            if(doacoesSislabra.length > 1 && VerificarAutorMaisDeUmaAutorDoacoes < 1){
                                VerificarAutorMaisDeUmaAutorDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Autor")
                            }else if(doacoesSislabra.length == 1 && VerificarAutorMaisDeUmaConjugeDoacoes < 1){
                                VerificarAutorMaisDeUmaConjugeDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Cônjuge")
                            }
                            
                            //VERIFICAR IMOVEIS EM SP
                            const imoveisSP = imoveisSp(pdf, CpfAutor); 
                            if(imoveisSP.length > 1 && VerificarAutorMaisDeUmaAutorImoveis < 1){
                                VerificarAutorMaisDeUmaAutorImoveis++
                                responseForPicaPau.push("Imoveis SP Autor")
                            }else if(imoveisSP.length == 1 && VerificarAutorMaisDeUmaConjugeImoveis < 1){
                                VerificarAutorMaisDeUmaConjugeImoveis++
                                responseForPicaPau.push(" Imoveis SP Cônjuge")
                            }





                        deletePDF('sislabra.pdf');
                        }catch{
                            (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "ERRO AO EXAMINAR SISLABRA", tarefaId }))
                            continue;
                        }
                    }
                    console.log(responseForPicaPau) */
                    
                
                
                


                
               
                  
                   /*  const procurarAdvogadoPilantraCapa: boolean = IdentificarAdvogadoPilantra((await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie)));
                    if(!procurarAdvogadoPilantraCapa){
                        response2.push("IMPEDITIVO ADVOGADO"  );
                    }
                    
                    
                    
                    



                    //Estrutura para identificar a maior data, e fazer a subtração dela
                    /* const xpathDataRequerimentos = '/html/body/div/div[3]';
                    const xpathDataRequerimentosFormatado: string = (getXPathText(parginaDosPrevFormatada, xpathDataRequerimentos));
                    let tamanhoColunasRequerimentos = 2;
                    const arrayDatas: Array<Date> = [];
                    let verificarWhileRequerimentos = true;
                    while(verificarWhileRequerimentos){
                        if(typeof (getXPathText(parginaDosPrevFormatada, `/html/body/div/div[3]/table/tbody/tr[${tamanhoColunasRequerimentos}]`)) == 'object'){
                            verificarWhileRequerimentos = false; 
                            break;
                        }
                        tamanhoColunasRequerimentos++;
                    }
                    
                        for(let t=2; t<tamanhoColunasRequerimentos; t++){
                            if(typeof (getXPathText(parginaDosPrevFormatada,`/html/body/div/div[3]/table/tbody/tr[${t}]`)) === 'string'){
                                const xpathColunaRequerimentos = `/html/body/div/div[3]/table/tbody/tr[${t}]`;
                                const xpathCoulaFormatadoRequerimentos: string = getXPathText(parginaDosPrevFormatada, xpathColunaRequerimentos);
                                if(xpathCoulaFormatadoRequerimentos.indexOf("INDEFERIDO") !== -1){
                                    const date: Array<Date> = extractDatesFromString(xpathCoulaFormatadoRequerimentos);
                                   
                                    arrayDatas.push(...date);
                                }
                            }
                        }
                        const dataAtual = encontrarDataMaisAtual(arrayDatas);
                        const dataMenosdezesseis = SubtrairAnoMaisAtual(dataAtual, -16); */
                        /* (await updateEtiquetaUseCase.execute({ cookie, etiqueta: `${dataAtual}`, tarefaId }))
                        continue; */



                        



                        //const arrayTeste: Array<string> = [];
                        //Estrutura para identificar data de emprego
                        /* let tamanhoColunaPrevidenciarias = 2;
                        let verificarWhilePrevidenciarias = true;
                        while(verificarWhilePrevidenciarias){
                            if(typeof (getXPathText(parginaDosPrevFormatada, `/html/body/div/div[4]/table/tbody/tr[${tamanhoColunaPrevidenciarias}]`)) == 'object'){
                                verificarWhilePrevidenciarias = false; 
                                break;
                            }
                            tamanhoColunaPrevidenciarias++;
                        }
                        
                         for(let p=2; p<tamanhoColunaPrevidenciarias; p++){
                            if(typeof (getXPathText(parginaDosPrevFormatada,`/html/body/div/div[4]/table/tbody/tr[${p}]`)) === 'string'){
                                const xpathColunaPrevidenciarias = `/html/body/div/div[4]/table/tbody/tr[${p}]`;
                                const xpathCoulaFormatadoPrevidenciarias: string = getXPathText(parginaDosPrevFormatada, xpathColunaPrevidenciarias);
                                if(xpathCoulaFormatadoPrevidenciarias.indexOf("Empregado") !== -1 || xpathCoulaFormatadoPrevidenciarias.indexOf("Contribuinte Individual") !== -1){
                                    const datasEmprego = converterDatasParaDate(ordenarDatas(getXPathText(parginaDosPrevFormatada, xpathColunaPrevidenciarias)));             
                                    const impeditivoBoolean = verificarDataNoPeriodoDeDezesseisAnos(dataAtual, dataMenosdezesseis, datasEmprego[0], datasEmprego[1]);
                                    if(impeditivoBoolean){
                                        responseForPicaPau.push("IMPEDITIVO EMPREGO")
                                        break;
                                    }
                                }
                                
                            }
                        } */
                        

                    


                    //Calcular idade;
                    /* const dataNascXpath: string = "/html/body/div/div[1]/table/tbody/tr[8]/td/text()";
                    const dataAjuizXpath: string = "/html/body/div/div[1]/table/tbody/tr[2]/td";
                    const generoXptah: string = "/html/body/div/div[1]/table/tbody/tr[11]/td"
                    const dataAjuizFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, dataAjuizXpath));
                    const dataNascFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, dataNascXpath));
                    const generoFormatado: string = correçaoDoErroDeFormatoDoSapiens(getXPathText(parginaDosPrevFormatada, generoXptah));;
                    const funcIdade: Boolean = calcIdade(dataNascFormatado, dataAjuizFormatado, generoFormatado);
                    if(!funcIdade){
                        response2.push("IMPEDITIVO IDADE")
                        //console.log("Entrou no if do impeditivo")
                    } */

                    /* const verificarIdade:boolean = VerificarIdadeCapa(parginaDosPrevFormatada)
                    if(!verificarIdade){
                        response2.push("IMPEDITIVO IDADE")
                    } */
                    


                
                
                   /*  deletePDF('sislabra.pdf') */
                     //Verificar litispedência                                                       
                    /* const xpathRelacaoProcesso = "/html/body/div/div[2]/table/tbody/tr[2]/td";                   
                    const xpathRelacaoProcessoFormatada: string = (getXPathText(parginaDosPrevFormatada, xpathRelacaoProcesso).trim());
                    const StringParaVerificar: string = "Não há relação dos processos movidos pelo autor contra o INSS.";
                    const xpathRelacaoProcessoMovidosFormatada:boolean = xpathRelacaoProcessoFormatada===StringParaVerificar;
                    if(!xpathRelacaoProcessoMovidosFormatada){   
                            response2.push("IMPEDITIVO LITISPÊNDENCIA")
                                             
                    } */
                




                    //Verificar Segurado especial

               
                    //verificar segurado codigo 2.0
                    /* const procurarVariavelSeguradoEspecial: number = parginaDosPrev.indexOf("SEGURADO_ESPECIAL");
                    if(procurarVariavelSeguradoEspecial !== -1){
                        response2.push("CONCESSÃO ANTERIOR")
                    } */

 


                /* const xpathInformacaoDeCabeçalho = "/html/body/div/p[2]/b[1]"
                const informacaoDeCabeçalho = getXPathText(parginaDosPrevFormatada, xpathInformacaoDeCabeçalho);
                //console.log("informacaoDeCabeçalho", informacaoDeCabeçalho)
                const informacaoDeCabeçalhoNaoExiste = !informacaoDeCabeçalho;
                //console.log(informacaoDeCabeçalhoNaoExiste)
                if (informacaoDeCabeçalhoNaoExiste) {
                    console.log("DOSPREV INVALIDO");
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }))
                    continue
                }
                // ative quando for para produçao
                if (VerificaçaoSeDosPrevInvalido(informacaoDeCabeçalho)) {
                    console.log("DOSPREV INVALIDO");
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }))
                    continue
                } */


                
               
                    let impedCapa: Array<String> = await impedimentosCapa.Impedimentos(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                    responseForPicaPau.push(...impedCapa);
                   

                    let impedDossie: Array<string> = await getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                    responseForPicaPau.push(...impedDossie) 

                    let impedSislabra: Array<string> = await getInformationSislabraForPicaPau.impedimentos(arrayDosIDParaBuscarpdf, cookie, CpfAutor)
                    responseForPicaPau.push(...impedSislabra)
                

                    /* let impedCapa: Array<String> = await impedimentosCapa.Impedimentos(await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                    responseForPicaPau.push(...impedCapa);
                    

                    let impedDossie: Array<string> = await getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev);
                    responseForPicaPau.push(...impedDossie)


/*                 var beneficios = await getInformaçoesIniciasDosBeneficios(parginaDosPrevFormatada)
                if (beneficios.length <= 0) {
                    console.log("DOSPREV SEM BENEFICIO VALIDOS");
                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV SEM BENEFICIO VALIDOS", tarefaId }))
                    continue
                }
                beneficios = await getInformaçoesSecudariaDosBeneficios(beneficios, parginaDosPrevFormatada)

                const xpathNumeroDoProcesso = "/html/body/div/div/table/tbody/tr/td"
                const numeroDoProcesso: string = getXPathText(parginaDosPrevFormatada, xpathNumeroDoProcesso);

                const xpathdataAjuizamento = "/html/body/div/div[1]/table/tbody/tr[2]/td"
                const dataAjuizamento: string = getXPathText(parginaDosPrevFormatada, xpathdataAjuizamento);

                const xpathNome = "/html/body/div/div[1]/table/tbody/tr[6]/td[1]"
                const nome: string = getXPathText(parginaDosPrevFormatada, xpathNome);

                const xpathCpf = "/html/body/div/div[1]/table/tbody/tr[7]/td"
                const cpf: string = getXPathText(parginaDosPrevFormatada, xpathCpf);

                const urlProcesso = `https://sapiens.agu.gov.br/visualizador?nup=${tarefas[i].pasta.NUP}&chave=${tarefas[i].pasta.chaveAcesso}&tarefaId=${tarefas[i].id}`
                // console.log("urlProcesso", urlProcesso, "cpf", cpf, "nome", nome, "dataAjuizamento", dataAjuizamento, "numeroDoProcesso", numeroDoProcesso);
                const citacao = coletarCitacao(arrayDeDocumentos)
                let informationsForCalculeDTO: IInformationsForCalculeDTO = await fazerInformationsForCalculeDTO(beneficios, numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao, parseInt(tarefaId))
                // { beneficio: "teste", dibAnterior: "teste", beneficioAcumuladoBoolean: false, dibInicial: "teste", dip: "teste", id: parseInt(tarefaId), nb: "teste", rmi: "teste", tipo: "teste", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao },
                console.log(informationsForCalculeDTO);
                response.push(informationsForCalculeDTO);
                // Ativar quando entrar em produção
                await updateEtiquetaUseCase.execute({ cookie, etiqueta: "TESTE API", tarefaId }) */
                

//console.log(response2)
                
                if(responseForPicaPau.length==0){
                    await updateEtiquetaUseCase.execute({cookie, etiqueta: "PROCESSO LIMPO", tarefaId});
                }else{
                    let etiquetaFinal = "";
                    for(let j = 0; j<responseForPicaPau.length; j++){
                        etiquetaFinal += responseForPicaPau[j] + " ,\n";

                    }

                        let lastCommaIndex = etiquetaFinal.lastIndexOf(',');   
                        etiquetaFinal = etiquetaFinal.slice(0, lastCommaIndex);
                    
                    const Imp = "IMPEDITIVOS: "
                    await updateEtiquetaUseCase.execute({cookie, etiqueta: `${Imp}${etiquetaFinal.slice(0,etiquetaFinal.length - 1)}`, tarefaId});
                    //console.log(etiquetaFinal)

                }


                responseForPicaPau = [];
            }
            return await response
        } catch (error) {
            console.log(error);
            console.log(response.length)
            if (response.length > 0) {
                return await response
            }
            else {
                new error;
            }
        }
    }

}

