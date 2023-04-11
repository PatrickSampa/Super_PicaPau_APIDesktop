"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindows = void 0;
const electron_1 = require("electron");
const app_1 = require("./app");
const child_process_1 = require("child_process");
let mainWindow;
electron_1.app.on("ready", createWindows);
function createWindows() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1100, height: 800,
        webPreferences: {},
        show: false
    });
    (0, child_process_1.exec)('pip install requests bs4', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o script: ${error}`);
            return;
        }
    });
    app_1.expr.get('/', (req, res) => res.send('Hello World 100!'));
    app_1.expr.listen(3000, () => console.log("Visao runing in PORT " + 3000));
    mainWindow.loadFile("./index2.html");
    mainWindow.on("ready-to-show", () => mainWindow.show());
}
exports.createWindows = createWindows;
//# sourceMappingURL=index.js.map