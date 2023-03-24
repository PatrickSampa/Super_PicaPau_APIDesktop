"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuarioUseCase = void 0;
const requestSapiens_1 = require("../../pytonRequest/requestSapiens");
class GetUsuarioUseCase {
    constructor(RequestGetUsuario) {
        this.RequestGetUsuario = RequestGetUsuario;
    }
    ;
    async execute(cookie) {
        const getUsuario = await this.RequestGetUsuario.execute();
        const response = (await (0, requestSapiens_1.RequestSapiens)(cookie, getUsuario));
        return response;
    }
}
exports.GetUsuarioUseCase = GetUsuarioUseCase;
//# sourceMappingURL=GetUsuarioUseCase.js.map