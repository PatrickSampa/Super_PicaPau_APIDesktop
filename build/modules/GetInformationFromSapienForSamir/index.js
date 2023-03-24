"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformationFromSapienForSamirController = exports.getInformationFromSapienForSamirUseCase = void 0;
const GetInformationFromSapienForSamirController_1 = require("./GetInformationFromSapienForSamirController");
const GetInformationFromSapienForSamirUseCase_1 = require("./GetInformationFromSapienForSamirUseCase");
const getInformationFromSapienForSamirUseCase = new GetInformationFromSapienForSamirUseCase_1.GetInformationFromSapienForSamirUseCase();
exports.getInformationFromSapienForSamirUseCase = getInformationFromSapienForSamirUseCase;
const getInformationFromSapienForSamirController = new GetInformationFromSapienForSamirController_1.GetInformationFromSapienForSamirController(getInformationFromSapienForSamirUseCase);
exports.getInformationFromSapienForSamirController = getInformationFromSapienForSamirController;
//# sourceMappingURL=index.js.map