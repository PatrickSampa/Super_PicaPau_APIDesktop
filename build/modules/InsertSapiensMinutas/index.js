"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSapiensMinutasController = exports.insertSapiensMinutasUseCase = void 0;
const InsertSapiensMinutasUseCase_1 = require("./InsertSapiensMinutasUseCase");
const InsertSapiensMinutasController_1 = require("./InsertSapiensMinutasController");
const insertSapiensMinutasUseCase = new InsertSapiensMinutasUseCase_1.InsertSapiensMinutasUseCase();
exports.insertSapiensMinutasUseCase = insertSapiensMinutasUseCase;
const insertSapiensMinutasController = new InsertSapiensMinutasController_1.InsertSapiensMinutasController(insertSapiensMinutasUseCase);
exports.insertSapiensMinutasController = insertSapiensMinutasController;
//# sourceMappingURL=index.js.map