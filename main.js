const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

const filePath = __dirname + "/test.txt";

const createNewWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile("index.html");

    mainWindow.webContents.openDevTools();
};

app.on("ready", createNewWindow);
app.on("window-all-closed", () => {
    app.quit();
});

ipcMain.on("insert-text", (event, text) => {
    fs.appendFile(filePath, `${text}\n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

ipcMain.on("show-name", (event) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        event.sender.send("show-name-reply", data);
    });
});
