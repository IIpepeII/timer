const path =  require('path');
const electron = require("electron");
const TimerTray = require('./app/timer_tray');
const { app, BrowserWindow, Menu, Tray, ipcMain } = electron;

let mainWindow;
let addWindow;
let tray;

app.on('ready', () => {
console.log(app.dock);
    mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  })
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname,`./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  const trayBounds = tray.getBounds();
  console.log(trayBounds.x, trayBounds.y);

});
