"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentoUseCase = void 0;
const requestSapiens_1 = require("../../pytonRequest/requestSapiens");
class CreateDocumentoUseCase {
    constructor(RequestCreateDocumento) {
        this.RequestCreateDocumento = RequestCreateDocumento;
    }
    ;
    async execute(data) {
        const playload = await this.RequestCreateDocumento.execute(data);
        const response = (await (0, requestSapiens_1.RequestSapiens)(data.cookie, playload));
        return response;
    }
}
exports.CreateDocumentoUseCase = CreateDocumentoUseCase;
//# sourceMappingURL=CreateDocumentoUseCase.js.map