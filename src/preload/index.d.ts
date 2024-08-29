import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      notificationApi: {
        sendNotification: (message: string) => void
      }
      appApi: {
        quitApp: () => void
      }
    }
    api: unknown
  }
}
