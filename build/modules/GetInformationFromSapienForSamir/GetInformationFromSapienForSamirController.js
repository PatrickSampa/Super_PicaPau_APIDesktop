"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformationFromSapienForSamirController = void 0;
class GetInformationFromSapienForSamirController {
    constructor(getInformationFromSapienForSamirUseCase) {
        this.getInformationFromSapienForSamirUseCase = getInformationFromSapienForSamirUseCase;
    }
    async handle(request, response) {
        const data = request.body;
        try {
            const result = await this.getInformationFromSapienForSamirUseCase.execute(data);
            response.status(200).json(result);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.GetInformationFromSapienForSamirController = GetInformationFromSapienForSamirController;
//# sourceMappingURL=GetInformationFromSapienForSamirController.js.map