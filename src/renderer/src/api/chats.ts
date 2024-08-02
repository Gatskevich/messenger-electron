import db from '../db/firestore'
import {
  DocumentData,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { IChat } from '@renderer/interfaces/IChat'
import { IUserProfile } from '@renderer/interfaces/IUserProfile'

export const fetchChats = async () => {
  const chatsCol = collection(db, 'chats')
  const chatsSnapshot = await getDocs(chatsCol)

  const chatList: IChat[] = chatsSnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData

    return {
      id: doc.id,
      admin: data.admin as string,
      description: data.description as string,
      image: data.image as string,
      name: data.name as string,
      joinedUserIds: data.joinedUserIds as string[]
    }
  })

  return chatList
}

export const createChat = async (chat: IChat) => {
  const chatsRef = doc(collection(db, 'chats'))
  await setDoc(chatsRef, chat)

  return chatsRef.id
}

export const joinChat = async (userId: string, chatId: string) => {
  const userRef = doc(db, 'profiles', userId)
  const chatRef = doc(db, 'chats', chatId)

  await updateDoc(userRef, { joinedChats: arrayUnion(chatRef.id) })
  await updateDoc(chatRef, { joinedUserIds: arrayUnion(userRef.id) })
}

export const subscribeToChat = (chatId: string, onSubsribe: (chat: IChat) => void) => {
  return onSnapshot(doc(db, 'chats', chatId), (doc) => {
    const chat = { ...(doc.data() as IChat), id: doc.id }
    onSubsribe(chat)
  })
}

export const subscribeToProfile = (id: string, onSubsribe: (user: IUserProfile) => void) => {
  return onSnapshot(doc(db, 'profiles', id), (doc) => {
    onSubsribe(doc.data() as IUserProfile)
  })
}
