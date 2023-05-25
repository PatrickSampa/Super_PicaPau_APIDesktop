"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lePdf = void 0;
const fs = require("fs");
const util_1 = require("util");
async function lePdf() {
    let result = "";
    const readFile = (0, util_1.promisify)(fs.readFile);
    console.log("Entrou lêPDF");
    const valor = fs.readFileSync(__dirname + '/testers.html', 'utf8');
    const xx = valor.split('Vínculos Empregatícios');
    const xxx = xx[1].split('Bens Declarados ao TSE');
    const regex = /\b\d{1,3}(?:\.\d{3})*(?:,\d{2})\b/g;
    const matches = `${xxx[0]}`.match(regex);
    if (matches == null || matches == undefined) {
        return null;
    }
    const impares = [];
    for (let i = 1; i < matches.length; i += 2) {
        impares.push(matches[i]);
    }
    console.log(impares);
    return impares;
}
exports.lePdf = lePdf;
//# sourceMappingURL=HeadPdf.js.map