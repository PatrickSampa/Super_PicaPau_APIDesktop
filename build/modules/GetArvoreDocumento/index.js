"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArvoreDocumentoController = exports.getArvoreDocumentoUseCase = void 0;
const GetArvoreDocumentoController_1 = require("./GetArvoreDocumentoController");
const GetArvoreDocumentoUseCase_1 = require("./GetArvoreDocumentoUseCase");
exports.getArvoreDocumentoUseCase = new GetArvoreDocumentoUseCase_1.GetArvoreDocumentoUseCase();
exports.getArvoreDocumentoController = new GetArvoreDocumentoController_1.GetArvoreDocumentoController(exports.getArvoreDocumentoUseCase);
//# sourceMappingURL=index.js.map