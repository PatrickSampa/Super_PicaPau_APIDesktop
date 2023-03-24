"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocumentUseCase = exports.uploadDocumentController = void 0;
const UploadDocumentController_1 = require("./UploadDocumentController");
const UploadDocumentUseCase_1 = require("./UploadDocumentUseCase");
const uploadDocumentUseCase = new UploadDocumentUseCase_1.UploadDocumentUseCase();
exports.uploadDocumentUseCase = uploadDocumentUseCase;
const uploadDocumentController = new UploadDocumentController_1.UploadDocumentController(uploadDocumentUseCase);
exports.uploadDocumentController = uploadDocumentController;
//# sourceMappingURL=index.js.map