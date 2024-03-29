"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPDF = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
async function readPDF(pdfPath) {
    const pdfBuffer = fs_1.default.readFileSync(pdfPath);
    const pdfData = await (0, pdf_parse_1.default)(pdfBuffer);
    return pdfData.text;
}
exports.readPDF = readPDF;
//# sourceMappingURL=teste1.js.map