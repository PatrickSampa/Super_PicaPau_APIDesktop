"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTarefaController = void 0;
class GetTarefaController {
    constructor(GetUsuarioUseCase) {
        this.GetUsuarioUseCase = GetUsuarioUseCase;
    }
    async handle(request, response) {
        const { cookie, etiqueta } = request.body;
        const { usuario_id } = request.params;
        try {
            const result = await this.GetUsuarioUseCase.execute({ cookie, usuario_id, etiqueta });
            response.status(200).json(result);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.GetTarefaController = GetTarefaController;
//# sourceMappingURL=GetTarefaController.js.map