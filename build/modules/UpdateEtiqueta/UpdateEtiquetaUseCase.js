"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEtiquetaUseCase = void 0;
const axios_1 = __importDefault(require("axios"));
const RequestHeaders_1 = require("../../sapiensOperations/resquest/RequestHeaders");
var querystring = require('querystring');
class UpdateEtiquetaUseCase {
    async execute(data) {
        const now = Date.now();
        const requestHeaders = new RequestHeaders_1.RequestHeaders;
        const headers = await requestHeaders.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/visualizador/etiqueta`;
        const playload = {
            tarefaId: data.tarefaId,
            creditoId: ``,
            comunicacaoJudicialId: ``,
            etiqueta: data.etiqueta,
        };
        return await axios_1.default.post(baseURL, querystring.stringify(playload), { headers }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return new Error(error);
        });
    }
}
exports.UpdateEtiquetaUseCase = UpdateEtiquetaUseCase;
//# sourceMappingURL=UpdateEtiquetaUseCase.js.map