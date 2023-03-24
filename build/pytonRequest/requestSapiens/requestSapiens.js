"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSapiens = void 0;
const axios_1 = __importDefault(require("axios"));
const RequestHeaders_1 = require("../../sapiensOperations/resquest/RequestHeaders");
async function requestSapiens(cookie, payload) {
    const requestHeaderUploadArquivo = new RequestHeaders_1.RequestHeaders;
    const headers = await requestHeaderUploadArquivo.execute(cookie);
    const baseURL = `https://sapiens.agu.gov.br/route`;
    const data = await JSON.parse(payload);
    return await axios_1.default.post(baseURL, data, { headers }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return new Error(error);
    });
}
exports.requestSapiens = requestSapiens;
//# sourceMappingURL=requestSapiens.js.map