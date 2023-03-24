"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInformationForSamir = void 0;
const CreateDocumento_1 = require("../CreateDocumento");
const GetTarefa_1 = require("../GetTarefa");
const GetUsuario_1 = require("../GetUsuario");
const LoginUsuario_1 = require("../LoginUsuario");
const UploadDocument_1 = require("../UploadDocument");
class RequestInformationForSamir {
    async execute(data) {
        const cookie = await LoginUsuario_1.loginUseCase.execute(data.login);
        const usuario = (await GetUsuario_1.getUsuarioUseCase.execute(cookie));
        const usuario_id = `${usuario[0].id}`;
        const usuario_nome = `${usuario[0].nome}`;
        var tidNumber = 3;
        const minutas = data.minutas;
        let response = [];
        const tarefas = await GetTarefa_1.getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta, processoJudicial: data.minutas[0].numeroprocesso });
        const processo = tarefas[0].pasta.processoJudicial.numero;
        console.log(processo, tarefas.length);
        const tarefa_id = `${tarefas[0].id}`;
        const pasta_id = `${tarefas[0].pasta.id}`;
        const processo_setor = `${tarefas[0].setorResponsavel_id}`;
        const tid = `${tidNumber}`;
        tarefas[0].postIt = "MEMÓRIA DE CALCULO INSERIDA NA MINUTA";
        tarefas[0].tid = tidNumber;
        const processoAfazer = minutas.find(minuta => minuta.numeroprocesso == processo);
        if (processoAfazer != null) {
            const createDocument = await CreateDocumento_1.createDocumentoUseCase.execute({ cookie, usuario_nome, usuario_setor: processo_setor, tarefa_id, pasta_id, tid });
            let documento_id = createDocument[0].id;
            const tipo_documento = "1344";
            const upload = await UploadDocument_1.uploadDocumentUseCase.execute(cookie, `${processo}MemoriaCalculo.html`, processoAfazer.conteudo, documento_id, tipo_documento);
            await response.push({ createDocument: createDocument[0], upload });
        }
        return response;
    }
}
exports.RequestInformationForSamir = RequestInformationForSamir;
//# sourceMappingURL=InsertOneCalculationMemoryUseCase.js.map