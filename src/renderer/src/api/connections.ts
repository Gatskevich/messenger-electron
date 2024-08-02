import db from '../db/firestore'
import { ref, onValue, getDatabase } from 'firebase/database'
import { doc, setDoc } from 'firebase/firestore'

const getOnlineStatus = (isOnline: boolean) => ({
  state: isOnline ? 'online' : 'offline',
  lastChanged: new Date(Date.now()).toISOString()
})

export const setUserOnlineStatus = async (userId: string, isOnline: boolean) => {
  const userRef = doc(db, 'profiles', userId)
  const updateData = getOnlineStatus(isOnline)

  await setDoc(userRef, updateData, { merge: true })
}

export const onConnectionChanged = (onConnection: (isConnected: boolean) => void) => {
  const dbRealTime = getDatabase()
  const connectedRef = ref(dbRealTime, '.info/connected')

  return onValue(connectedRef, (snap) => {
    const isConnected = snap?.val() ? snap.val() : false

    onConnection(isConnected)
  })
}
