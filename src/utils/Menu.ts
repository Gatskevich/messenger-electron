import { MessageBoxOptions, app } from 'electron'
import { MenuItemConstructorOptions } from 'electron'

export const template: MenuItemConstructorOptions[] = [
  {
    label: process.platform === 'darwin' ? app.getName() : 'Menu',
    submenu: [
      {
        label: 'Exit',
        click: () => {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            const { BrowserWindow } = require('electron')
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach((win) => {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            focusedWindow.reload()
          }
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'App Menu Demo',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            const options: MessageBoxOptions = {
              type: 'info',
              title: 'Application Menu Demo',
              buttons: ['Ok', 'Cancel'],
              message:
                'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
            }
            const { dialog } = require('electron')
            dialog.showMessageBox(focusedWindow, options)
          }
        }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        click: () => {
          app.emit('activate')
        }
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => {
          const { shell } = require('electron')
          shell.openExternal('http://electron.atom.io')
        }
      }
    ]
  }
]
