"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerGetInformationsForPicaPau = void 0;
const express_1 = require("express");
const GetInformationFromSapienForSamir_1 = require("../modules/GetInformationFromSapienForSamir");
exports.routerGetInformationsForPicaPau = (0, express_1.Router)();
exports.routerGetInformationsForPicaPau.post("/getInformationFromSapienForSamir", async (req, res) => {
    console.log(req);
    return GetInformationFromSapienForSamir_1.getInformationFromSapienForSamirController.handle(req, res);
});
exports.routerGetInformationsForPicaPau.post("/getInformationFromSapienForSamirSemIdade", async (req, res) => {
    return GetInformationFromSapienForSamir_1.getInformationFromSapienForSamirControllerSemIdade.handle(req, res);
});
exports.routerGetInformationsForPicaPau.post("/getInformationFromSapiesForPicaPau", async (req, res) => {
    return GetInformationFromSapienForSamir_1.getInformationFromSapienForSamirController.handle(req, res);
});
//# sourceMappingURL=GetInformationsForSamirroutes.routes.js.map