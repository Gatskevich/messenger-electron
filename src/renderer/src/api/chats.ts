import { ChatItem } from '@renderer/interfaces/ChatItem'
import db from '../db/firestore'
import { DocumentData, collection, getDocs } from 'firebase/firestore/lite'

export const fetchChats = async () => {
  const chatsCol = collection(db, 'chats')
  const chatsSnapshot = await getDocs(chatsCol)
  const chatList: ChatItem[] = chatsSnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData

    return {
      id: doc.id,
      admin: data.admin as string,
      description: data.description as string,
      image: data.image as string,
      name: data.name as string
    }
  })

  return chatList
}
