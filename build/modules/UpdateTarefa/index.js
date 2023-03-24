"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTarefaUseCase = void 0;
const RequestGetUsuario_1 = require("../../sapiensOperations/resquest/RequestGetUsuario");
const UpdateTarefaUseCase_1 = require("./UpdateTarefaUseCase");
const requestGetUsuario = new RequestGetUsuario_1.RequestGetUsuario();
const updateTarefaUseCase = new UpdateTarefaUseCase_1.UpdateTarefaUseCase(requestGetUsuario);
exports.updateTarefaUseCase = updateTarefaUseCase;
//# sourceMappingURL=index.js.map