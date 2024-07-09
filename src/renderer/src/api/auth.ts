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

export const login = async ({ email, password }: ILoginFormInput) => {
  const auth = getAuth()
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  const userProfile = await getUserProfile(user.uid)

  return userProfile
}

export const register = async ({ email, password, username, avatar }: IRegisterFormInput) => {
  const auth = getAuth()
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  const userProfile = { id: user.uid, username, email, avatar, joinedChats: [] }

  await createUserProfile(userProfile)

  return userProfile
}

export const onAuthStateChanges = (onAuth) => {
  const auth = getAuth()

  return onAuthStateChanged(auth, onAuth)
}

export const logout = () => getAuth().signOut()
