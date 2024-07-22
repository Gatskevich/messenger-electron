import { configureStore } from '@reduxjs/toolkit'
import chatSlice, { ChatState } from '@renderer/slices/chats'
import authSlice, { AuthState } from '@renderer/slices/auth'
import appSlice, { AppState } from '@renderer/slices/app'

export const store = configureStore({
  reducer: {
    chats: chatSlice,
    auth: authSlice,
    app: appSlice
  }
})

export type RootState = {
  chats: ChatState
  auth: AuthState
  app: AppState
}

export type AppDispatch = typeof store.dispatch
