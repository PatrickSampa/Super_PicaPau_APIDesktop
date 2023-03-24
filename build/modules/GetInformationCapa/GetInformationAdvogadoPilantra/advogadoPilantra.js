"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advogados = void 0;
class Advogados {
    async AdvogadoPilantra(capaHTML) {
        const arrayAdvogadosPilantra = ["SABRINA DE PONTES ARAUJO", "ADRIANO GOMES DE DEUS", "ANDERSON JOSÉ LOPES FRANCO", "EDER NILSON VIANA DA SILVA", "EUCLIDES RABELO ALENCAR", "EVANDRO SOUZA MUNIZ", "FRANKLIN DAYWISON JAQUES", "ESCRITÓRIO ADVOCACIA CAVALCANTE & MONT SERRAT", "GUILHERME HENRIQUE BRANCO DE OLIVEIRA", "ITALO BENEDITO DA CRUZ MAGALHÃES", "JOÃO PAULO DE LIMA SILVA", "KELLY JAMILLY DE OLIVEIRA FERREIRA", "RAYMUNDO MAURÍCIO PINTO JÚNIOR", "RONALDO DIAS CAVALCANTE", "SABRINA PONTES DE ARAÚJO", "SILANY SOARES ASSIS", "TARCÍSIO SAMPAIO DA SILVA", "WENNYSON DA SILVA CARDOSO", "WILLIAM VIANA DA SILVA"];
        for (let i = 0; i < arrayAdvogadosPilantra.length; i++) {
            if ((capaHTML.indexOf(arrayAdvogadosPilantra[i])) !== -1) {
                return false;
            }
        }
        return true;
    }
}
exports.Advogados = Advogados;
//# sourceMappingURL=advogadoPilantra.js.map