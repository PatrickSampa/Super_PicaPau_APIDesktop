"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTarefaUseCase = void 0;
const requestSapiens_1 = require("../../pytonRequest/requestSapiens");
class GetTarefaUseCase {
    constructor(RequestGetTarefa) {
        this.RequestGetTarefa = RequestGetTarefa;
    }
    ;
    async execute(data) {
        const getTarefa = await this.RequestGetTarefa.execute(data.usuario_id, data.etiqueta);
        const response = (await (0, requestSapiens_1.RequestSapiens)(data.cookie, getTarefa));
        return response;
    }
}
exports.GetTarefaUseCase = GetTarefaUseCase;
//# sourceMappingURL=GetTarefaUseCase.js.map