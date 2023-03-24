"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSapiens = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
async function LoginSapiens(login) {
    dotenv_1.default.config();
    const CMD_Python = process.env.CMD_Python;
    const { spawn } = require('child_process');
    const childPython = spawn(CMD_Python, ["./python/loginPython.py", login.cpf, login.senha]);
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            dataPython = (`${data}`).replace("\r\n", "");
        });
        childPython.stderr.on("data", (data) => {
            console.log(`${data} login`);
            reject(`${data}`);
        });
        childPython.on("close", (code) => {
            resolve(dataPython);
        });
    });
}
exports.LoginSapiens = LoginSapiens;
//# sourceMappingURL=index.js.map