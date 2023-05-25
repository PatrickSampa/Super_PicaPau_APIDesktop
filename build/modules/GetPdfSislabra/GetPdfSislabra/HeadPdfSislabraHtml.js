"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirArquivosComPrefixo = void 0;
const fs = require('fs');
async function excluirArquivosComPrefixo() {
    try {
        const arquivos = fs.readdirSync(__dirname);
        arquivos.forEach((arquivo) => {
            if (arquivo.startsWith("tester")) {
                const caminhoArquivo = `${__dirname}/${arquivo}`;
                fs.unlinkSync(caminhoArquivo);
                console.log(`Arquivo ${arquivo} excluído com sucesso.`);
            }
        });
    }
    catch (error) {
        console.error(`Erro ao ler o diretório: ${error.message}`);
    }
}
exports.excluirArquivosComPrefixo = excluirArquivosComPrefixo;
//# sourceMappingURL=HeadPdfSislabraHtml.js.map