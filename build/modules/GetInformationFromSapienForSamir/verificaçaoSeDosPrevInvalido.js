"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificaçaoSeDosPrevInvalido = void 0;
const date_fns_1 = require("date-fns");
function VerificaçaoSeDosPrevInvalido(dosPrev) {
    const dateString = dosPrev.split(": ")[1];
    const dateObject = (0, date_fns_1.parse)(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
    const difference = Date.now() - dateObject.getTime();
    const differenceInDays = difference / (1000 * 60 * 60 * 24);
    if (differenceInDays > 30) {
        return true;
    }
    else {
        return false;
    }
}
exports.VerificaçaoSeDosPrevInvalido = VerificaçaoSeDosPrevInvalido;
//# sourceMappingURL=verifica%C3%A7aoSeDosPrevInvalido.js.map