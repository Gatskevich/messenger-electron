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
import { IUpdateChatUserState } from '@renderer/interfaces/IUpdateChatUserState'
import { IMessage } from '@renderer/interfaces/IMessage'
import { ISetMessages } from '@renderer/interfaces/ISetMessages'
import { IMessageSubscription } from '@renderer/interfaces/IMessageSubscription'

// Common actions
export const createChatFulfilled = createAction('chat/createChatFulfilled')
export const joinToChatFulfilled = createAction<IChat>('chat/joinToChatFulfilled')
export const clearChatsFulfilled = createAction('chat/clearChatsFulfilled')
export const setActiveChatFulfilled = createAction<IActiveChat>('chat/setActiveChatFulfilled')
export const updateUserStateFulfilled = createAction<IUpdateChatUserState>(
  'chat/updateUserStateFulfilled'
)
export const chatMessageSentFulfilled = createAction<IMessage>('chat/chatMessageSentFulfilled')
export const chatSetMessagesFulfilled = createAction<ISetMessages>('chat/chatSetMessagesFulfilled')
export const registerMessageSubscription = createAction<IMessageSubscription>(
  'chat/registerMessageSubscriptionFulfilled'
)

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

    dispatch(setActiveChatFulfilled({ ...chatParams, joinedUsers }))
  })
}

export const subscribeToProfile = (id: string, chatId: string) => (dispatch: AppDispatch) => {
  return api.subscribeToProfile(id, async (user) => {
    dispatch(updateUserStateFulfilled({ user, chatId }))
  })
}

export const sendChatMessage =
  (message: IMessage, chatId: string) => (dispatch: AppDispatch, getState) => {
    const newMessage = { ...message }
    const { user } = getState().auth
    const userRef = doc(db, 'profiles', user.id)
    newMessage.author = userRef.id

    return api
      .sendChatMessage(newMessage, chatId)
      .then((_) => dispatch(chatMessageSentFulfilled(newMessage)))
  }

export const subscribeToMessages = (chatId: string) => (dispatch: AppDispatch) => {
  return api.subscribeToMessages(chatId, async (changes) => {
    const chatMessages: IMessage[] = changes.map((change) => {
      if (change.type === 'added') {
        return { id: change.doc.id, ...change.doc.data() }
      }
    })

    const messagesWithAuthor: IMessage[] = []
    const cache = {}

    for await (let message of chatMessages) {
      if (typeof message.author !== 'string' && cache[message.author?.id || '']) {
        message.author = cache[message.author?.id || '']
      } else {
        const userRef = doc(db, 'profiles', message.author as string)
        const userSnapshot = await getDoc(userRef)
        cache[userSnapshot.id] = userSnapshot.data()
        message.author = cache[userSnapshot.id]
      }

      messagesWithAuthor.push(message)
    }

    return dispatch(chatSetMessagesFulfilled({ messages: messagesWithAuthor, chatId }))
  })
}
