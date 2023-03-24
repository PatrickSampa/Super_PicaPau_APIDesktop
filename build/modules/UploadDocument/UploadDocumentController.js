"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDocumentController = void 0;
class UploadDocumentController {
    constructor(UploadDocumentUseCase) {
        this.UploadDocumentUseCase = UploadDocumentUseCase;
    }
    async handle(request, response) {
        const { cookie, fileName, conteudo, tipo_documento, documento_id } = request.body;
        try {
            const response = await this.UploadDocumentUseCase.execute(cookie, fileName, conteudo, documento_id, tipo_documento);
            response.status(200).json(response);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.UploadDocumentController = UploadDocumentController;
//# sourceMappingURL=UploadDocumentController.js.map