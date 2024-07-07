import { IChatItem } from '@renderer/interfaces/IChatItem'
import db from '../db/firestore'
import { DocumentData, collection, getDocs } from 'firebase/firestore'

export const fetchChats = async () => {
  const chatsCol = collection(db, 'chats')
  const chatsSnapshot = await getDocs(chatsCol)
  const chatList: IChatItem[] = chatsSnapshot.docs.map((doc) => {
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
