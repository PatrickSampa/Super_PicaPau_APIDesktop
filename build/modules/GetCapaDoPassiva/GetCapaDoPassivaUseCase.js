"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCapaDoPassivaUseCase = void 0;
const RequestHeaders_1 = require("../../sapiensOperations/resquest/RequestHeaders");
const axios_1 = __importDefault(require("axios"));
class GetCapaDoPassivaUseCase {
    async execute(nup, cookie) {
        const now = Date.now();
        const requestHeaderUploadArquivo = new RequestHeaders_1.RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/capa?nup=${nup}`;
        return await axios_1.default.get(baseURL, { headers }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return new Error(error);
        });
    }
}
exports.GetCapaDoPassivaUseCase = GetCapaDoPassivaUseCase;
//# sourceMappingURL=GetCapaDoPassivaUseCase.js.map