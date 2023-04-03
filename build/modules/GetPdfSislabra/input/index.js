"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerminalInput = void 0;
function getTerminalInput(subArrays) {
    return new Promise((resolve, reject) => {
        console.log(subArrays);
        const output = [];
        if (process.stdin.isTTY) {
            const arrayp = ['f:\PROJETOS\VisaoPicaPau_nãoTest\visao-api-main (1)\visao-api-main\src\modules\GetPdfSislabra\data\product-details-requisition-1.pdf'];
            console.log(arrayp);
            const input = arrayp;
            console.log(input);
            console.log("index do input");
            const len = Math.min(subArrays, Math.ceil(input.length / subArrays));
            while (input.length) {
                output.push(input.splice(0, len));
            }
            resolve(output);
        }
        else {
            let input = '';
            process.stdin.setEncoding('utf-8');
            process.stdin.on('readable', () => {
                let chunk;
                while (chunk = process.stdin.read())
                    input += chunk;
            });
            process.stdin.on('end', () => {
                input = input.trim().split('\n');
                const len = Math.min(input.length, Math.ceil(input.length / subArrays));
                while (input.length) {
                    output.push(input.splice(0, len));
                }
                resolve(output);
            });
        }
    });
}
exports.getTerminalInput = getTerminalInput;
//# sourceMappingURL=index.js.map