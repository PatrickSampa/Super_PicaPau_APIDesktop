"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSapiens = void 0;
const requestSapiens_1 = require("./requestSapiens");
async function RequestSapiens(coockie, operation) {
    const response = await (0, requestSapiens_1.requestSapiens)(coockie, operation);
    return response[0].result.records;
}
exports.RequestSapiens = RequestSapiens;
//# sourceMappingURL=index.js.map