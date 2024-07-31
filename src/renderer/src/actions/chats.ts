import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/chats'
import { IChatFormInput } from '@renderer/interfaces/IChatFormInput'
import db from '@renderer/db/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { AppDispatch } from '@renderer/store'
import { IUserProfile } from '@renderer/interfaces/IUserProfile'
import { ISortedChats } from '@renderer/interfaces/ISortedChats'
import { IChat } from '@renderer/interfaces/IChat'
import { IActiveChat } from '@renderer/interfaces/IActiveChat'

// Common actions
export const createChatFulfilled = createAction('chat/createChatFulfilled')
export const joinToChatFulfilled = createAction<IChat>('chat/joinToChatFulfilled')
export const clearChatsFulfilled = createAction('chat/clearChatsFulfilled')
export const subscribeToChatFulfilled = createAction<IActiveChat>('chat/setActiveChat')
export const updateUserStateFulfilled = createAction<IUserProfile>('chat/updateUserState')

export const getChats = createAsyncThunk('chat/getChats', async (user: IUserProfile | null) => {
  if (!user) {
    return {
      joined: [],
      available: []
    }
  }

  const chats = await api.fetchChats()
  const sortedChats = chats.reduce(
    (accuChats: ISortedChats, chat) => {
      accuChats[chat.joinedUserIds?.includes(user.id) ? 'joined' : 'available'].push(chat)

      return accuChats
    },
    { joined: [], available: [] }
  )

  return sortedChats
})

// Dispatching auth changes
export const joinChat = (chat: IChat, userId: string) => async (dispatch: AppDispatch) => {
  await api.joinChat(userId, chat.id || '')

  dispatch(joinToChatFulfilled(chat))
}

export const createChat =
  (formData: IChatFormInput, userId: string) => async (dispatch: AppDispatch) => {
    const userRef = doc(db, 'profiles', userId)
    const newChat = {
      ...formData,
      admin: userRef.id
    }
    const chatId = await api.createChat(newChat)

    dispatch(createChatFulfilled())

    await api.joinChat(userId, chatId)

    dispatch(joinToChatFulfilled({ ...newChat, id: chatId }))

    return chatId
  }

export const subscribeToChat = (chatId: string) => (dispatch: AppDispatch) => {
  return api.subscribeToChat(chatId, async (chat) => {
    const { joinedUserIds, ...chatParams } = chat

    const joinedUsers = await Promise.all(
      (joinedUserIds || []).map(async (userId) => {
        const userSnapshot = await getDoc(doc(db, 'profiles', userId))
        return userSnapshot.data() as IUserProfile
      })
    )

    dispatch(subscribeToChatFulfilled({ ...chatParams, joinedUsers }))
  })
}

export const subscribeToProfile = (id: string) => (dispatch: AppDispatch) => {
  return api.subscribeToProfile(id, async (user) => {
    dispatch(updateUserStateFulfilled(user))
  })
}
