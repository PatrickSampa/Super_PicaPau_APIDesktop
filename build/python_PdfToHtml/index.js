"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHtmlFromPdf = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
async function CreateHtmlFromPdf() {
    dotenv_1.default.config();
    const CMD_Python = process.env.CMD_Python;
    const { spawn } = require('child_process');
    const childPython = spawn(CMD_Python, ["./python/pdfToHtml.py"]);
    return new Promise((resolve, reject) => {
        childPython.on('exit', (code) => {
            if (code == 0) {
                resolve('Pdt to html successfully');
            }
            else {
                reject('Erro to transform pdf');
            }
        });
        childPython.on('error', (error) => {
            reject('`Erro ao executar o processo pythonHtml: ${error.message}`');
        });
    });
}
exports.CreateHtmlFromPdf = CreateHtmlFromPdf;
//# sourceMappingURL=index.js.map