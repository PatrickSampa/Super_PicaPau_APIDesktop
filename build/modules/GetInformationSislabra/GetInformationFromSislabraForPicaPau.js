"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationSislabraForPicaPau = void 0;
const GetPdfForPicaPau_1 = require("../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau");
const ReadPdf_1 = require("../GetPdfSislabra/ReadPdf");
const GetPdfForPicaPau_2 = require("../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau");
const GetInformationDoacoesEleitorais_1 = require("./GetInformationDoacoesEleitorais");
const GetInformationEmpresa_1 = require("./GetInformationEmpresa");
const GetInformationVeiculo_1 = require("./GetInformationVeiculo");
const GetInformationImoveis_1 = require("./GetInformationImoveis");
const GetInformationBensTse_1 = require("./GetInformationBensTse");
const GetInformationImoveisRurais_1 = require("./GetInformationImoveisRurais");
const GetInformationEmbarcacoes_1 = require("./GetInformationEmbarcacoes");
const GetInformationAeronave_1 = require("./GetInformationAeronave");
const GetInformationEmprego_1 = require("./GetInformationEmprego");
const CreateHtml_1 = require("../GetPdfSislabra/GetPdfSislabra/CreateHtml");
const DeleteHtml_1 = require("../GetPdfSislabra/GetPdfSislabra/DeleteHtml");
class GetInformationSislabraForPicaPau {
    async impedimentos(arrayDosIDParaBuscarpdf, cookie, cpfAutor) {
        console.log("ENTROU NO FOR DO SISLABRA");
        var responseForPicaPau = [];
        var VerificarAutorMaisDeUmaAutorEmpresa = 0;
        var VerificarAutorMaisDeUmaConjugeEmpresa = 0;
        var VerificarAutorMaisDeUmaAutorVeiculo = 0;
        var VerificarAutorMaisDeUmaConjugeVeiculo = 0;
        var VerificarAutorMaisDeUmaAutorEndereco = 0;
        var VerificarAutorMaisDeUmaConjugeEndereco = 0;
        var VerificarAutorMaisDeUmaAutorDoacoes = 0;
        var VerificarAutorMaisDeUmaConjugeDoacoes = 0;
        var VerificarAutorMaisDeUmaAutorImoveis = 0;
        var VerificarAutorMaisDeUmaConjugeImoveis = 0;
        var VerificarAutorMaisDeUmaAutorDoacoesTse = 0;
        var VerificarAutorMaisDeUmaConjugerDoacoesTse = 0;
        var VerificarAutorMaisDeUmaAutorImoveisRurais = 0;
        var VerificarAutorMaisDeUmaConjugeImoveisRurais = 0;
        var VerificarAutorMaisDeUmaAutorEmbarcacoes = 0;
        var VerificarAutorMaisDeUmaConjugeEmbarcacoes = 0;
        var VerificarAutorMaisDeUmaAutorAeronaves = 0;
        var VerificarAutorMaisDeUmaConjugeAeronaves = 0;
        var VerificarAutorMaisDeUmaAutorEmpregos = 0;
        var VerificarAutorMaisDeUmaConjugeEmpregos = 0;
        console.log(arrayDosIDParaBuscarpdf);
        for (let i = 0; i < arrayDosIDParaBuscarpdf.length; i++) {
            console.log("entrou aqui n vezes");
            await (0, GetPdfForPicaPau_1.downloadPDFWithCookies)(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`, cookie)
                .then(() => console.log('PDF downloaded successfully!'))
                .catch((error) => console.error('Error downloading PDF:', error));
            try {
                console.log("aqui");
                const pdf = await (0, ReadPdf_1.readPDF)('build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf');
                await (0, CreateHtml_1.criarHtml)();
                const impedEmpresa = await GetInformationEmpresa_1.empresa.hundle(pdf, cpfAutor);
                if (impedEmpresa.length >= 2 && VerificarAutorMaisDeUmaAutorEmpresa < 1) {
                    VerificarAutorMaisDeUmaAutorEmpresa++;
                    responseForPicaPau.push("Empresa autor");
                }
                else if (impedEmpresa[0] == true && VerificarAutorMaisDeUmaConjugeEmpresa < 1 && impedEmpresa.length < 2) {
                    VerificarAutorMaisDeUmaConjugeEmpresa++;
                    responseForPicaPau.push("Empresa cônjuge");
                }
                else {
                    console.log("Não tem impeditivo empresa");
                }
                console.log("segunda parte");
                const impeditivoVeiculoBolean = await GetInformationVeiculo_1.veiculo.hundle(pdf, cpfAutor);
                console.log("AQUI NO FOR " + impeditivoVeiculoBolean);
                if (impeditivoVeiculoBolean.length > 1 && VerificarAutorMaisDeUmaAutorVeiculo < 1) {
                    console.log("VEICULO AUTOR");
                    console.log(impeditivoVeiculoBolean.length);
                    VerificarAutorMaisDeUmaAutorVeiculo++;
                    responseForPicaPau.push("VEICULO AUTOR");
                }
                else if (impeditivoVeiculoBolean.length == 1 && impeditivoVeiculoBolean[0] == true && VerificarAutorMaisDeUmaConjugeVeiculo < 1) {
                    console.log("VEICULO cônjuge");
                    VerificarAutorMaisDeUmaConjugeVeiculo++;
                    responseForPicaPau.push("VEICULO cônjuge");
                }
                const doacoesSislabra = await GetInformationDoacoesEleitorais_1.doacoesEleitorais.hundle(pdf, cpfAutor);
                if (doacoesSislabra.length > 1 && VerificarAutorMaisDeUmaAutorDoacoes < 1) {
                    VerificarAutorMaisDeUmaAutorDoacoes++;
                    responseForPicaPau.push(" Doações Eleitorais Autor");
                }
                else if (doacoesSislabra.length == 1 && VerificarAutorMaisDeUmaConjugeDoacoes < 1) {
                    VerificarAutorMaisDeUmaConjugeDoacoes++;
                    responseForPicaPau.push(" Doações Eleitorais Cônjuge");
                }
                const imoveisSP = await GetInformationImoveis_1.imoveis.handle(pdf, cpfAutor);
                if (imoveisSP.length > 1 && VerificarAutorMaisDeUmaAutorImoveis < 1) {
                    VerificarAutorMaisDeUmaAutorImoveis++;
                    responseForPicaPau.push("Imoveis SP Autor");
                }
                else if (imoveisSP.length == 1 && VerificarAutorMaisDeUmaConjugeImoveis < 1) {
                    VerificarAutorMaisDeUmaConjugeImoveis++;
                    responseForPicaPau.push(" Imoveis SP Cônjuge");
                }
                console.log("quinta parte");
                const doacoesTSE = await GetInformationBensTse_1.doacoesTse.handle(pdf, cpfAutor);
                if (doacoesTSE.length > 1 && VerificarAutorMaisDeUmaAutorDoacoesTse < 1) {
                    VerificarAutorMaisDeUmaAutorDoacoesTse++;
                    responseForPicaPau.push("Bens Declarados ao TSE Autor");
                }
                else if (doacoesTSE.length == 1 && VerificarAutorMaisDeUmaConjugerDoacoesTse < 1) {
                    VerificarAutorMaisDeUmaConjugerDoacoesTse++;
                    responseForPicaPau.push("Bens Declarados ao TSE Cônjuge");
                }
                console.log("secxta parte");
                const IImoveisRurais = await GetInformationImoveisRurais_1.imoveisRurais.handle(pdf, cpfAutor);
                if (IImoveisRurais.length > 1 && VerificarAutorMaisDeUmaAutorImoveisRurais < 1) {
                    VerificarAutorMaisDeUmaAutorImoveisRurais++;
                    responseForPicaPau.push("Imoveis Rurais Autor");
                }
                else if (IImoveisRurais.length == 1 && VerificarAutorMaisDeUmaConjugeImoveisRurais < 1) {
                    VerificarAutorMaisDeUmaConjugeImoveisRurais++;
                    responseForPicaPau.push("Imoveis Rurais Cônjuge");
                }
                console.log("setima parte");
                const IEmbarcacoes = await GetInformationEmbarcacoes_1.embarcacoes.handle(pdf, cpfAutor);
                if (IEmbarcacoes.length > 1 && VerificarAutorMaisDeUmaAutorEmbarcacoes < 1) {
                    VerificarAutorMaisDeUmaAutorEmbarcacoes++;
                    responseForPicaPau.push("Embarcações Autor");
                }
                else if (IEmbarcacoes.length == 1 && VerificarAutorMaisDeUmaConjugeEmbarcacoes < 1) {
                    VerificarAutorMaisDeUmaConjugeEmbarcacoes++;
                    responseForPicaPau.push("Embarcações Cônjuge");
                }
                console.log("oitava parte");
                const IAeronaves = await GetInformationAeronave_1.aeronaves.handle(pdf, cpfAutor);
                if (IAeronaves.length > 1 && VerificarAutorMaisDeUmaAutorAeronaves < 1) {
                    VerificarAutorMaisDeUmaAutorAeronaves++;
                    responseForPicaPau.push("Aeronaves Autor");
                }
                else if (IAeronaves.length == 1 && VerificarAutorMaisDeUmaConjugeAeronaves < 1) {
                    VerificarAutorMaisDeUmaConjugeAeronaves++;
                    responseForPicaPau.push("Aeronaves Cônjuge");
                }
                console.log("nona parte");
                console.log("Com o Split:  " + await GetInformationEmprego_1.emprego.handle(pdf, cpfAutor) + "@@");
                const EEmpregos = await GetInformationEmprego_1.emprego.handle(pdf, cpfAutor);
                console.log("ddddddddddddddddddddd" + EEmpregos);
                if (EEmpregos.length > 1 && VerificarAutorMaisDeUmaAutorEmpregos < 1) {
                    VerificarAutorMaisDeUmaAutorEmpregos++;
                    responseForPicaPau.push("Emprego sislabra Autor");
                }
                else if (EEmpregos.length == 1 && VerificarAutorMaisDeUmaConjugeEmpregos < 1) {
                    VerificarAutorMaisDeUmaConjugeEmpregos++;
                    responseForPicaPau.push("Emprego sislabra Cônjuge");
                }
                await (0, DeleteHtml_1.excluirArquivosComPrefixo)();
                (0, GetPdfForPicaPau_2.deletePDF)('sislabra.pdf');
            }
            catch (_a) {
                responseForPicaPau.length == 0;
                responseForPicaPau.push("ERRO AO EXAMINAR SISLABRA");
                return responseForPicaPau;
            }
        }
        return responseForPicaPau;
    }
}
exports.GetInformationSislabraForPicaPau = GetInformationSislabraForPicaPau;
//# sourceMappingURL=GetInformationFromSislabraForPicaPau.js.map