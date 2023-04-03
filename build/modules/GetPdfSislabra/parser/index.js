'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const pdfreader_1 = require("pdfreader");
const parse_1 = require("./parse");
class Parser {
    constructor(options) {
        this.reader = new pdfreader_1.PdfReader();
    }
    async parse(buffer) {
        console.log("index do parser: ");
        try {
            const data = await (0, parse_1.parse)(buffer, this.reader);
            const outputString = JSON.stringify(data, null, 2);
            return outputString;
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.default = Parser;
if (!module.parent) {
    require('./standalone.js');
}
//# sourceMappingURL=index.js.map