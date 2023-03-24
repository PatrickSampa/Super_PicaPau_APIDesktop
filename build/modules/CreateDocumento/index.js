"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentoController = exports.createDocumentoUseCase = void 0;
const RequestCreateDocumento_1 = require("../../sapiensOperations/resquest/RequestCreateDocumento");
const CreateDocumentoController_1 = require("./CreateDocumentoController");
const CreateDocumentoUseCase_1 = require("./CreateDocumentoUseCase");
const requestCreateDocumento = new RequestCreateDocumento_1.RequestCreateDocumento();
const createDocumentoUseCase = new CreateDocumentoUseCase_1.CreateDocumentoUseCase(requestCreateDocumento);
exports.createDocumentoUseCase = createDocumentoUseCase;
const createDocumentoController = new CreateDocumentoController_1.CreateDocumentoController(createDocumentoUseCase);
exports.createDocumentoController = createDocumentoController;
//# sourceMappingURL=index.js.map