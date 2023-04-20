import { downloadPDFWithCookies } from "../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau";
import { readPDF } from "../GetPdfSislabra/ReadPdf";
import { deletePDF } from "../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau";
import { doacoesEleitorais } from "./GetInformationDoacoesEleitorais";
import { emprego } from "./GetInformationEmprego";
import { veiculo } from "./GetInformationVeiculo";
import { endereco } from "./GetInformationEndereco";
import { imoveis } from "./GetInformationImoveis";


export class GetInformationSislabraForPicaPau{
    async impedimentos(arrayDosIDParaBuscarpdf: Array<any>, cookie: any, cpfAutor: string): Promise<Array<string>>{
                var responseForPicaPau : Array<string> = [];
                var VerificarAutorMaisDeUmaAutorEmpresa: number = 0;
                var VerificarAutorMaisDeUmaConjugeEmpresa: number = 0;
                var VerificarAutorMaisDeUmaAutorVeiculo: number = 0;
                var VerificarAutorMaisDeUmaConjugeVeiculo: number = 0;
                var VerificarAutorMaisDeUmaAutorEndereco: number = 0;
                var VerificarAutorMaisDeUmaConjugeEndereco: number = 0;
                var VerificarAutorMaisDeUmaAutorDoacoes: number = 0;
                var VerificarAutorMaisDeUmaConjugeDoacoes : number = 0;
                var VerificarAutorMaisDeUmaAutorImoveis: number = 0;
                var VerificarAutorMaisDeUmaConjugeImoveis : number = 0;

                    for(let i=0; i<arrayDosIDParaBuscarpdf.length; i++){
                        //console.log(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`)
                        
                        await downloadPDFWithCookies(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`,cookie)
                        .then(() => console.log('PDF downloaded successfully!'))
                        .catch((error) => console.error('Error downloading PDF:', error));
                        console.log("Entrou aqui")
                        try{
                            console.log("aqui")
                        const pdf = await readPDF('build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf')
                        
                        //Ative quando for para produção
                        /* const pdf = await readPDF('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf') */
                        

                            //VERIFICAÇÃO IMPEDITIVO EMPRESA
                            const impedEmprego: Array<boolean> = await emprego.hundle(pdf, cpfAutor);
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
                            const impeditivoVeiculoBolean: Array<any> = await veiculo.hundle(pdf, cpfAutor);
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
                            const enderecosBolean:Array<boolean> = await endereco.handle(pdf, cpfAutor);
                            if(enderecosBolean.length > 1 && VerificarAutorMaisDeUmaAutorEndereco < 1){
                                VerificarAutorMaisDeUmaAutorEndereco++;
                                responseForPicaPau.push(" Cidade Autor")
                            }else if(enderecosBolean.length == 1 && VerificarAutorMaisDeUmaConjugeEndereco < 1){
                                VerificarAutorMaisDeUmaConjugeEndereco++;
                                responseForPicaPau.push("cidade Cônjuge")
                            }


                            //VERIFICAR DOAÇOES ELEITORAIS
                            const doacoesSislabra: Array<boolean> = await doacoesEleitorais.hundle(pdf, cpfAutor);
                            if(doacoesSislabra.length > 1 && VerificarAutorMaisDeUmaAutorDoacoes < 1){
                                VerificarAutorMaisDeUmaAutorDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Autor")
                            }else if(doacoesSislabra.length == 1 && VerificarAutorMaisDeUmaConjugeDoacoes < 1){
                                VerificarAutorMaisDeUmaConjugeDoacoes++
                                responseForPicaPau.push(" Doações Eleitorais Cônjuge")
                            }
                            
                            //VERIFICAR IMOVEIS EM SP
                            const imoveisSP = await imoveis.handle(pdf, cpfAutor); 
                            if(imoveisSP.length > 1 && VerificarAutorMaisDeUmaAutorImoveis < 1){
                                VerificarAutorMaisDeUmaAutorImoveis++
                                responseForPicaPau.push("Imoveis SP Autor")
                            }else if(imoveisSP.length == 1 && VerificarAutorMaisDeUmaConjugeImoveis < 1){
                                VerificarAutorMaisDeUmaConjugeImoveis++
                                responseForPicaPau.push(" Imoveis SP Cônjuge")
                            }





                        deletePDF('sislabra.pdf');
                        return responseForPicaPau;
                        }catch{
                            responseForPicaPau.length == 0;
                            responseForPicaPau.push("ERRO AO EXAMINAR SISLABRA")
                            return responseForPicaPau;
                        }

                        
                    }
                    console.log(responseForPicaPau)
    }
}