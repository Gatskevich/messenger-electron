import db from '../db/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { IUserProfile } from '@renderer/interfaces/IUserProfile'
import { IRegisterFormInput } from '@renderer/interfaces/IRegisterFormInput'
import { ILoginFormInput } from '@renderer/interfaces/ILoginFormInput'

const createUserProfile = async (userProfile: IUserProfile) => {
  const userDoc = doc(db, 'profiles', userProfile.id)

  return await setDoc(userDoc, userProfile)
}

export const getUserProfile = async (id: string): Promise<IUserProfile> => {
  const userDoc = doc(db, 'profiles', id)

  return getDoc(userDoc).then((snapshot) => snapshot.data() as IUserProfile)
}

export const login = ({ email, password }: ILoginFormInput) => {
  const auth = getAuth()

  return signInWithEmailAndPassword(auth, email, password)
}

export const register = async ({ email, password, username, avatar }: IRegisterFormInput) => {
  const auth = getAuth()
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  return await createUserProfile({ id: user.uid, username, email, avatar, joinedChats: [] })
}

export const onAuthStateChanges = (onAuth) => {
  const auth = getAuth()

  return onAuthStateChanged(auth, onAuth)
}

export const logout = () => getAuth().signOut()
