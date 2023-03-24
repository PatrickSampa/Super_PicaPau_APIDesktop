"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentoController = void 0;
class CreateDocumentoController {
    constructor(CreateDocumentoUseCase) {
        this.CreateDocumentoUseCase = CreateDocumentoUseCase;
    }
    async handle(request, response) {
        const { cookie, pasta_id, usuario_nome, usuario_setor, tarefa_id, tid, tipoDocumento_id, modelo_id } = request.body;
        try {
            const result = await this.CreateDocumentoUseCase.execute({
                cookie,
                pasta_id,
                usuario_nome,
                usuario_setor,
                tarefa_id,
                tid,
                tipoDocumento_id,
                modelo_id
            });
            response.status(200).json(result);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.CreateDocumentoController = CreateDocumentoController;
//# sourceMappingURL=CreateDocumentoController.js.map