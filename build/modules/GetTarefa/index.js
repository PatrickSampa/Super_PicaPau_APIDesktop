"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTarefaController = exports.getTarefaUseCase = void 0;
const RequestGetTarefa_1 = require("../../sapiensOperations/resquest/RequestGetTarefa");
const GetTarefaController_1 = require("./GetTarefaController");
const GetTarefaUseCase_1 = require("./GetTarefaUseCase");
const requestGetTarefa = new RequestGetTarefa_1.RequestGetTarefa();
const getTarefaUseCase = new GetTarefaUseCase_1.GetTarefaUseCase(requestGetTarefa);
exports.getTarefaUseCase = getTarefaUseCase;
const getTarefaController = new GetTarefaController_1.GetTarefaController(getTarefaUseCase);
exports.getTarefaController = getTarefaController;
//# sourceMappingURL=index.js.map