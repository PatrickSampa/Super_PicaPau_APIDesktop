"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTarefaUseCase = void 0;
const requestSapiens_1 = require("../../pytonRequest/requestSapiens");
class UpdateTarefaUseCase {
    constructor(RequestUpdateTarefa) {
        this.RequestUpdateTarefa = RequestUpdateTarefa;
    }
    ;
    async execute(cookie, data) {
        const payload = await this.RequestUpdateTarefa.execute(data);
        const response = (await (0, requestSapiens_1.RequestSapiens)(cookie, payload));
        return response;
    }
}
exports.UpdateTarefaUseCase = UpdateTarefaUseCase;
//# sourceMappingURL=UpdateTarefaUseCase.js.map