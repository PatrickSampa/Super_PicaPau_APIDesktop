"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coletarCitacao = void 0;
function coletarCitacao(arrayDeDocumentos) {
    const ObjectCitacao = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.nome == "CITAÇÃO");
    if (ObjectCitacao == null) {
        return null;
    }
    const ArrayDataCitacaoParaFormatacao = ObjectCitacao.documentoJuntado.dataHoraProducao.date.split(" ")[0].split("-");
    const dataCitacao = `${ArrayDataCitacaoParaFormatacao[2]}/${ArrayDataCitacaoParaFormatacao[1]}/${ArrayDataCitacaoParaFormatacao[0]}`;
    return dataCitacao;
}
exports.coletarCitacao = coletarCitacao;
//# sourceMappingURL=coletarCitacao.js.map