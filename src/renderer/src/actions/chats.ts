import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/chats'

export const getChats = createAsyncThunk('chat/getChats', async () => {
  const chats = await api.fetchChats()
  return chats
})
