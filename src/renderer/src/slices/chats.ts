import { createSlice } from '@reduxjs/toolkit'
import { getChats } from '../actions/chats'
import { IChat } from '@renderer/interfaces/IChat'

export interface ChatState {
  joined: IChat[]
  available: IChat[]
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  joined: [],
  available: [],
  loading: false,
  error: null as string | null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatFulfilled: (state) => {},
    joinToChatFulfilled: (state, action) => {
      console.log('action.payload')
      console.log(action.payload)
      state.joined = [...state.joined, action.payload]
      state.available = state.available.filter((chat) => chat.id !== action.payload.id)
    },
    clearChatsFulfilled: (state) => {
      state.joined = []
      state.available = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.joined = action.payload.joined
        state.available = action.payload.available
        state.loading = false
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch chats'
      })
  }
})

export default chatSlice.reducer
