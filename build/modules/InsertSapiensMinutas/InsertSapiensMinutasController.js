"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSapiensMinutasController = void 0;
class InsertSapiensMinutasController {
    constructor(requestInformationForSamir) {
        this.requestInformationForSamir = requestInformationForSamir;
    }
    async handle(request, response) {
        const { login, etiqueta, minutas } = request.body;
        try {
            const result = await this.requestInformationForSamir.execute({ login, etiqueta, minutas });
            response.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.InsertSapiensMinutasController = InsertSapiensMinutasController;
//# sourceMappingURL=InsertSapiensMinutasController.js.map