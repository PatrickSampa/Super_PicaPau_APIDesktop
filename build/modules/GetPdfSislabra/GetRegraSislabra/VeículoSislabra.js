"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.impeditivoVeiculo = void 0;
function impeditivoVeiculo(StringSislabra, cpfAutor) {
    const ArrayVerificarAutor = [];
    const ocorrenciasRenavam = [];
    const ocorrenciasMotoneta = [];
    const ocorrenciasMotocicleta = [];
    const ocorrenciasCpfAutor = [];
    const novaStringSislabra = StringSislabra.replace(/\s{3,}/g, ",");
    const novaStringparaAcharNome = novaStringSislabra.split("CPF");
    let indiceCpf = novaStringSislabra.indexOf(cpfAutor);
    let indiceRenavan = novaStringSislabra.indexOf("Renavam");
    let indiceMotoneta = novaStringSislabra.indexOf("MOTONETA");
    let indiceMotocicleta = novaStringSislabra.indexOf("MOTOCICLETA");
    while (indiceRenavan >= 0) {
        ocorrenciasRenavam.push(indiceRenavan);
        indiceRenavan = novaStringSislabra.indexOf("Renavam", indiceRenavan + 1);
    }
    while (indiceMotoneta >= 0) {
        ocorrenciasMotoneta.push(indiceMotoneta);
        indiceMotoneta = novaStringSislabra.indexOf("MOTONETA", indiceMotoneta + 1);
    }
    while (indiceMotocicleta >= 0) {
        ocorrenciasMotocicleta.push(indiceMotocicleta);
        indiceMotocicleta = novaStringSislabra.indexOf("MOTOCICLETA", indiceMotocicleta + 1);
    }
    while (indiceCpf >= 0) {
        ocorrenciasCpfAutor.push(indiceCpf);
        indiceCpf = novaStringSislabra.indexOf(cpfAutor, indiceCpf + 1);
    }
    const motonetaMaisMotocicleta = ocorrenciasMotocicleta.length + ocorrenciasMotoneta.length;
    if (ocorrenciasMotoneta.length == ocorrenciasRenavam.length || novaStringSislabra.indexOf("Veículos Vinculados - Nenhum dado encontrado") != -1 || ocorrenciasRenavam.length == motonetaMaisMotocicleta) {
        return [];
    }
    else {
        if (ocorrenciasCpfAutor.length > 1) {
            console.log("CARRO");
            return [true, true];
        }
        return [true];
    }
}
exports.impeditivoVeiculo = impeditivoVeiculo;
//# sourceMappingURL=Ve%C3%ADculoSislabra.js.map