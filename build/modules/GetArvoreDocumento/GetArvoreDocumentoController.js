"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArvoreDocumentoController = void 0;
class GetArvoreDocumentoController {
    constructor(requestInformationForSamir) {
        this.requestInformationForSamir = requestInformationForSamir;
    }
    async handle(request, response) {
        const data = request.body;
        try {
            const result = await this.requestInformationForSamir.execute(data);
            response.status(200).json(result);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.GetArvoreDocumentoController = GetArvoreDocumentoController;
//# sourceMappingURL=GetArvoreDocumentoController.js.map