import {app, ipcMain, BrowserWindow, Menu} from "electron";
import { expr } from "./app";
import { exec } from 'child_process';
import {randomIntFromInterval} from './teste'





let mainWindow : BrowserWindow;

app.on("ready", createWindows);

export function createWindows (): void{
    mainWindow = new BrowserWindow({
        
        width: 1000, height: 700,
        webPreferences: {
        },
        show: false
        
    })
    /* const temp = [

    ]
    

   
    const menu = Menu.buildFromTemplate(temp);
    Menu.setApplicationMenu(menu); */


    exec('pip install requests bs4', (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`Erro ao executar o script: ${error}`);
          return;
        }
      });
    const port = randomIntFromInterval(1,30000);
    expr.get('/', (req, res) => res.send('Hello World 100!'))

    expr.listen(3000, () => console.log("Visao runing in PORT " +   3000));


    mainWindow.loadFile("./index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show())

}
