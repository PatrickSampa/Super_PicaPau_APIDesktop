"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreparingForJSON = void 0;
class PreparingForJSON {
    async execute(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == 34) {
                data[i] = 39;
            }
            else if (data[i] == 39) {
                data[i] = 34;
            }
            else if (data[i] == 84 && i > 0 && data[i - 1] == 32) {
                data[i] = 116;
            }
            else if (data[i] == 70 && i > 0 && data[i - 1] == 32) {
                data[i] = 102;
            }
        }
        return data.toString();
    }
}
exports.PreparingForJSON = PreparingForJSON;
//# sourceMappingURL=PreparingForJSON.js.map