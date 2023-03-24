"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArvoreDocumentoUseCase = void 0;
const axios_1 = __importDefault(require("axios"));
const RequestHeaders_1 = require("../../sapiensOperations/resquest/RequestHeaders");
class GetArvoreDocumentoUseCase {
    async execute(data) {
        const now = Date.now();
        const requestHeaderUploadArquivo = new RequestHeaders_1.RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/arvore?_dc=${now}&nup=${data.nup}&node=root`;
        return await axios_1.default.get(baseURL, { headers }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return new Error(error);
        });
    }
}
exports.GetArvoreDocumentoUseCase = GetArvoreDocumentoUseCase;
//# sourceMappingURL=GetArvoreDocumentoUseCase.js.map