import { createSlice } from '@reduxjs/toolkit'
import { getChats } from '../actions/chats'
import { IChat } from '@renderer/interfaces/IChat'
import { IActiveChats } from '@renderer/interfaces/IActiveChats'

export interface ChatState {
  joined: IChat[]
  available: IChat[]
  activeChats: IActiveChats
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  joined: [],
  available: [],
  activeChats: {},
  loading: false,
  error: null as string | null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatFulfilled: (state) => {},
    joinToChatFulfilled: (state, action) => {
      state.joined = [...state.joined, action.payload]
      state.available = state.available.filter((chat) => chat.id !== action.payload.id)
    },
    clearChatsFulfilled: (state) => {
      state.joined = []
      state.available = []
    },
    setActiveChatFulfilled: (state, action) => {
      state.activeChats[action.payload.id] = action.payload
    },
    updateUserStateFulfilled: (state, action) => {
      const { user, chatId } = action.payload
      const chat = state.activeChats[chatId]

      if (chat) {
        const joinedUsers = chat.joinedUsers
        if (joinedUsers) {
          const index = joinedUsers.findIndex((joinedUser) => joinedUser.id === user.id)

          if (index >= 0) {
            if (joinedUsers[index].state !== user.state) {
              joinedUsers[index].state = user.state
            }
          }
        }
      }
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
