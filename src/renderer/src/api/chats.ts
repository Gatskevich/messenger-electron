import db from '../db/firestore'
import { collection, getDocs } from 'firebase/firestore/lite'

export const fetchChats = async () => {
  const chatsCol = collection(db, 'chats')
  const chatsSnapshot = await getDocs(chatsCol)
  const cityList = chatsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return cityList
}
