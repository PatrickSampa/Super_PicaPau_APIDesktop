"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePDF = exports.downloadPDFWithCookies = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function downloadPDFWithCookies(url, cookies) {
    const response = await axios_1.default.get(url, {
        headers: {
            Cookie: cookies,
            'Content-Type': 'application/pdf',
        },
        responseType: 'arraybuffer',
    });
    const filePath = path_1.default.join(__dirname, 'sislabra.pdf');
    fs_1.default.writeFileSync(filePath, response.data);
}
exports.downloadPDFWithCookies = downloadPDFWithCookies;
function deletePDF(filename) {
    const filePath = path_1.default.join(__dirname, filename);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${filename} was deleted successfully`);
    });
}
exports.deletePDF = deletePDF;
//# sourceMappingURL=GetPdfForPicaPau.js.map