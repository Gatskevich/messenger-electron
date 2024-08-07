/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_API_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_API_PROJECT_ID: string
  readonly VITE_FIREBASE_API_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_API_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_API_APP_ID: string
  readonly VITE_DATABASE_URL: string
}
