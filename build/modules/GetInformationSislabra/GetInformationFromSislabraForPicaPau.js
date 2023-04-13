"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationSislabraForPicaPau = void 0;
const GetPdfForPicaPau_1 = require("../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau");
const ReadPdf_1 = require("../GetPdfSislabra/ReadPdf");
const GetPdfForPicaPau_2 = require("../GetPdfSislabra/GetPdfSislabra/GetPdfForPicaPau");
const GetInformationDoacoesEleitorais_1 = require("./GetInformationDoacoesEleitorais");
const GetInformationEmprego_1 = require("./GetInformationEmprego");
const GetInformationVeiculo_1 = require("./GetInformationVeiculo");
const GetInformationEndereco_1 = require("./GetInformationEndereco");
const GetInformationImoveis_1 = require("./GetInformationImoveis");
class GetInformationSislabraForPicaPau {
    async impedimentos(arrayDosIDParaBuscarpdf, cookie, cpfAutor) {
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
        for (let i = 0; i < arrayDosIDParaBuscarpdf.length; i++) {
            await (0, GetPdfForPicaPau_1.downloadPDFWithCookies)(`https://sapiens.agu.gov.br/documento/${arrayDosIDParaBuscarpdf[i]}`, cookie)
                .then(() => console.log('PDF downloaded successfully!'))
                .catch((error) => console.error('Error downloading PDF:', error));
            console.log("Entrou aqui");
            try {
                console.log("aqui");
                const pdf = await (0, ReadPdf_1.readPDF)('build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf');
                const impedEmprego = await GetInformationEmprego_1.emprego.hundle(pdf, cpfAutor);
                if (impedEmprego.length >= 2 && VerificarAutorMaisDeUmaAutorEmpresa < 1) {
                    VerificarAutorMaisDeUmaAutorEmpresa++;
                    responseForPicaPau.push("Empresa autor");
                }
                else if (impedEmprego[0] == true && VerificarAutorMaisDeUmaConjugeEmpresa < 1 && impedEmprego.length < 2) {
                    VerificarAutorMaisDeUmaConjugeEmpresa++;
                    responseForPicaPau.push("Empresa cônjuge");
                }
                else {
                    console.log("Não tem impeditivo empresa");
                }
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
                const enderecosBolean = await GetInformationEndereco_1.endereco.handle(pdf, cpfAutor);
                if (enderecosBolean.length > 1 && VerificarAutorMaisDeUmaAutorEndereco < 1) {
                    VerificarAutorMaisDeUmaAutorEndereco++;
                    responseForPicaPau.push(" Cidade Autor");
                }
                else if (enderecosBolean.length == 1 && VerificarAutorMaisDeUmaConjugeEndereco < 1) {
                    VerificarAutorMaisDeUmaConjugeEndereco++;
                    responseForPicaPau.push("cidade Cônjuge");
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
                (0, GetPdfForPicaPau_2.deletePDF)('sislabra.pdf');
                return responseForPicaPau;
            }
            catch (_a) {
                responseForPicaPau.length == 0;
                responseForPicaPau.push("ERRO AO EXAMINAR SISLABRA");
                return responseForPicaPau;
            }
        }
        console.log(responseForPicaPau);
    }
}
exports.GetInformationSislabraForPicaPau = GetInformationSislabraForPicaPau;
//# sourceMappingURL=GetInformationFromSislabraForPicaPau.js.map