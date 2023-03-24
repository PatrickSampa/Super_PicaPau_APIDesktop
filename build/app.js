"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expr = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const expr = (0, express_1.default)();
exports.expr = expr;
expr.use(express_1.default.json({ limit: '50mb' }));
expr.use(express_1.default.urlencoded({ limit: '50mb' }));
expr.use((0, cors_1.default)());
expr.use((0, morgan_1.default)("dev"));
expr.use(routes_1.routes);
//# sourceMappingURL=app.js.map