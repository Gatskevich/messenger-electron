import { configureStore } from '@reduxjs/toolkit'
import chatSlice, { ChatState } from '../slices/chats'

export const store = configureStore({
  reducer: {
    chats: chatSlice
  }
})

export type RootState = {
  chats: ChatState
}
export type AppDispatch = typeof store.dispatch
