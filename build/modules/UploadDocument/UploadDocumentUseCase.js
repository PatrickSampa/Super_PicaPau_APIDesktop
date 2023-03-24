"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDocumentUseCase = void 0;
const RequestHeaderUploadArquivo_1 = require("../../sapiensOperations/resquest/RequestHeaderUploadArquivo");
const axios_1 = __importDefault(require("axios"));
class UploadDocumentUseCase {
    async execute(Coockie, fileName, conteudo, documento_id, tipo_documento) {
        const requestHeaderUploadArquivo = new RequestHeaderUploadArquivo_1.RequestHeaderUploadArquivo;
        const headers = await requestHeaderUploadArquivo.execute({ file_name: fileName, cookie: Coockie, tamanho: conteudo.length });
        const baseURL = `https://sapiens.agu.gov.br/upload_arquivo?documento=${documento_id}`;
        const data = conteudo;
        return await axios_1.default.post(baseURL, data, { headers }).then(response => {
            console.log(response.status);
            console.log(response.data);
            return response.status;
        }).catch(error => {
            console.log(error);
            return new Error(error);
        });
    }
}
exports.UploadDocumentUseCase = UploadDocumentUseCase;
//# sourceMappingURL=UploadDocumentUseCase.js.map