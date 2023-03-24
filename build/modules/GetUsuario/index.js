"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioController = exports.getUsuarioUseCase = void 0;
const GetUsuarioUseCase_1 = require("./GetUsuarioUseCase");
const GetUsuarioController_1 = require("./GetUsuarioController");
const RequestGetUsuario_1 = require("../../sapiensOperations/resquest/RequestGetUsuario");
const requestGetUsuario = new RequestGetUsuario_1.RequestGetUsuario();
const getUsuarioUseCase = new GetUsuarioUseCase_1.GetUsuarioUseCase(requestGetUsuario);
exports.getUsuarioUseCase = getUsuarioUseCase;
const getUsuarioController = new GetUsuarioController_1.GetUsuarioController(getUsuarioUseCase);
exports.getUsuarioController = getUsuarioController;
//# sourceMappingURL=index.js.map