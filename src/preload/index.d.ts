import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      notificationApi: {
        sendNotification: (message: string) => void
      }
    }
    api: unknown
  }
}
