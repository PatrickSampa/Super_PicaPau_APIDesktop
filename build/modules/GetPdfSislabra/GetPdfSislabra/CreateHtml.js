"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarHtml = void 0;
const { Poppler } = require("node-poppler");
const util_1 = require("util");
const fs = require("fs");
async function criarHtml() {
    const readFile = (0, util_1.promisify)(fs.readFile);
    const writeFile = (0, util_1.promisify)(fs.writeFile);
    try {
        console.log("entrou na funcao html");
        const file = await readFile(__dirname + '/sislabra.pdf');
        const poppler = new Poppler();
        const options = {
            firstPageToConvert: 2,
            lastPageToConvert: 5,
        };
        await poppler.pdfToHtml(file, __dirname + '/tester.html', options);
    }
    catch (err) {
        console.log(console.error('Erro ao criar o arquivo html'));
    }
}
exports.criarHtml = criarHtml;
//# sourceMappingURL=CreateHtml.js.map