'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const parser = new index_1.default();
process.stdin
    .pipe(parser)
    .pipe(process.stdout)
    .on('finish', () => process.exit(0))
    .on('error', () => process.exit(1));
//# sourceMappingURL=standalone.js.map