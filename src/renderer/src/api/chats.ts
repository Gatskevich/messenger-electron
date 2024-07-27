import db from '../db/firestore'
import {
  DocumentData,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { IChat } from '@renderer/interfaces/IChat'

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
      joinedUsers: data.joinedUsers as string[]
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
  await updateDoc(chatRef, { joinedUsers: arrayUnion(userRef.id) })
}
