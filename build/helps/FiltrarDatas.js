"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDatesFromString = void 0;
const moment_1 = __importDefault(require("moment"));
function extractDatesFromString(text) {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/g;
    const matches = text.match(dateRegex);
    const date = (0, moment_1.default)(matches, 'DD/MM/YYYY').toDate();
    if (date) {
        return [date];
    }
    else {
        return [];
    }
}
exports.extractDatesFromString = extractDatesFromString;
//# sourceMappingURL=FiltrarDatas.js.map