const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { getWindowSettings, saveBounds } = require('./settings');

const path = require('path');
const url = require('url');
const ipc = ipcMain

let win;

function createWindow() {

  const bounds = getWindowSettings()

  win = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    minWidth: 494,
    minHeight: 712,
    maximizable: true,
    fullscreen: false,
    fullscreenable: false,
    resizable: true,
    // autoHideMenuBar: true,
    icon: __dirname + '/icons/app-icon.png',
    frame: false,
    show: false,
    transparent: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.on('resized', () => saveBounds(win.getSize()))

  win.loadFile('app/index.html') // Загрузить файл при открытии
  win.setBackgroundColor('#d2d2d2;') // Цвет фона окна приложения
  // win.setMenuBarVisibility(false)


  // Открытие линков _blank в браузере по умолчанию
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open URL in user's browser.
    return { action: "deny" }; // Prevent the app from opening the URL.
  })


  /////// КНОПКИ ТАЙТЛ бАРА
  //// МИНИМАЙЗ
  ipc.on('minimizeApp', () => {
    win.minimize()
  })

  //// МАКСИМАЙЗ
  ipc.on('maximizeRestoreApp', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })

  //// ЗАКРЫТЬ
  ipc.on('closeApp', () => {
    win.close()
  })
  /////////////////////////


  //// ЗАКРЫТИЕ ОКОН (НЕ ОТНОСИТСЯ К КНОПКАМ)
  win.on('closed', () => {
    win = null;
  })


  //// SPLASH СКРИН
  var splash = new BrowserWindow({
    width: 500,
    height: 300,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    frame: false,
    hasShadow: true,
    alwaysOnTop: true,
    icon: __dirname + '/icons/app-icon.png',
    webPreferences: {
      devTools: false
    }
  });

  splash.loadFile('splash.html');
  splash.center();
  win.once('ready-to-show', () => {
    splash.close();
    win.center(); // Центрирует окно в любом случаи!
    win.show();
  });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Если все окна закрыты - закрыть приложение, малое отношение к виндовс, но имеет к маку
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});