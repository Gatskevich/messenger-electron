import { configureStore } from '@reduxjs/toolkit'
import chatSlice, { ChatState } from '@renderer/slices/chats'
import authSlice, { AuthState } from '@renderer/slices/auth'
import appSlice, { AppState } from '@renderer/slices/app'
import appMiddleware from './middlewares/app'

export const store = configureStore({
  reducer: {
    chats: chatSlice,
    auth: authSlice,
    app: appSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appMiddleware)
})

export type RootState = {
  chats: ChatState
  auth: AuthState
  app: AppState
}

export type AppDispatch = typeof store.dispatch
