import { configureStore } from '@reduxjs/toolkit'
import chatSlice, { ChatState } from '@renderer/slices/chats'
import authSlice, { AuthState } from '@renderer/slices/auth'

export const store = configureStore({
  reducer: {
    chats: chatSlice,
    auth: authSlice
  }
})

export type RootState = {
  chats: ChatState
  auth: AuthState
}
export type AppDispatch = typeof store.dispatch
