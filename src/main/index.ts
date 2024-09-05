import { app, shell, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { template } from '../utils/Menu'

const iconPath = join(__dirname, '../../resources/icon.png')
const dockIconPath = join(__dirname, '../../resources/react_app_logo.png')
const trayIconPath = join(__dirname, '../../resources/react_icon.png')

function createSplashWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: '#6e707e',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadFile(join(__dirname, '../renderer/splash.html'))

  return win
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    backgroundColor: '#6e707e',
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon: iconPath } : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.openDevTools()

  return mainWindow
}

app
  .whenReady()
  .then(() => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    const tray = new Tray(trayIconPath)
    tray.setContextMenu(menu)

    if (process.platform === 'darwin') {
      app.dock.setIcon(dockIconPath)
    }

    const splash = createSplashWindow()
    const mainApp = createWindow()

    mainApp.once('ready-to-show', () => {
      splash.destroy()
      mainApp.show()
      setTimeout(() => {
        splash.destroy()
        mainApp.show()
      }, 2000)
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  .catch((error) => {
    console.error('Failed to initialize the app:', error)
  })

ipcMain.on('notify', (_, message: string) => {
  console.log(`Notification: ${message}`)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
