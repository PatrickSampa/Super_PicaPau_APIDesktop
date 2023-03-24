"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInsertSapiens = void 0;
const express_1 = require("express");
const InsertSapiensMinutas_1 = require("../modules/InsertSapiensMinutas");
const LoginUsuario_1 = require("../modules/LoginUsuario");
exports.routerInsertSapiens = (0, express_1.Router)();
exports.routerInsertSapiens.post("/insertMinutas", async (req, res) => {
    return InsertSapiensMinutas_1.insertSapiensMinutasController.handle(req, res);
});
exports.routerInsertSapiens.post("/login", async (req, res) => {
    return LoginUsuario_1.loginController.handle(req, res);
});
//# sourceMappingURL=InsertSapiensForSamir.routes.js.map