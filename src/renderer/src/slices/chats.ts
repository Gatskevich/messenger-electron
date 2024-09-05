import { createSlice } from '@reduxjs/toolkit'
import { getChats } from '../actions/chats'
import { IChat } from '@renderer/interfaces/IChat'
import { IActiveChats } from '@renderer/interfaces/IActiveChats'
import { IMessages } from '@renderer/interfaces/IMessages'
import { IMessagesSubscriptions } from '@renderer/interfaces/IMessagesSubscriptions'

export interface ChatState {
  joined: IChat[]
  available: IChat[]
  activeChats: IActiveChats
  messages: IMessages
  messagesSubscriptions: IMessagesSubscriptions
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  joined: [],
  available: [],
  activeChats: {},
  messages: {},
  messagesSubscriptions: {},
  loading: false,
  error: null as string | null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatFulfilled: () => {},
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
    },
    chatSetMessagesFulfilled: (state, action) => {
      const chatId = action.payload.chatId
      const newMessages = action.payload.messages

      const prevMessages = state.messages[chatId] || []

      const allMessages = [...prevMessages, ...newMessages]
      const uniqueMessages = allMessages.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id)
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])

      state.messages[chatId] = uniqueMessages
    },
    registerMessageSubscriptionFulfilled: (state, action) => {
      state.messagesSubscriptions = {
        ...state.messagesSubscriptions,
        [action.payload.chatId]: action.payload.sub
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
