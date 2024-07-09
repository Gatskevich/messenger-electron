import { createSlice } from '@reduxjs/toolkit'
import { getChats } from '../actions/chats'
import { IChatItem } from '../interfaces/IChatItem'

export interface ChatState {
  items: IChatItem[]
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  items: [],
  loading: false,
  error: null as string | null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch chats'
      })
  }
})

export default chatSlice.reducer
