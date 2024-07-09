import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/auth'
import { IRegisterFormInput } from '@renderer/interfaces/IRegisterFormInput'
import { IUserProfile } from '@renderer/interfaces/IUserProfile'
import { AppDispatch } from '@renderer/store'
import { ILoginFormInput } from '@renderer/interfaces/ILoginFormInput'

// Common actions
export const listenToAuthChangesPending = createAction('auth/listenToAuthChangesPending')
export const listenToAuthChangesFulfilled = createAction<IUserProfile | null>(
  'auth/listenToAuthChangesFulfilled'
)
export const listenToAuthChangesRejected = createAction('auth/listenToAuthChangesRejected')

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: IRegisterFormInput) => {
    const user = await api.register(formData)
    return user
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', async (formData: ILoginFormInput) => {
  const user = await api.login(formData)
  return user
})

export const logout = createAsyncThunk('auth/logout', async () => {
  return api.logout()
})

// Dispatching auth changes
export const listenToAuthChanges = () => async (dispatch: AppDispatch) => {
  dispatch(listenToAuthChangesPending())
  api.onAuthStateChanges(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid)
      dispatch(listenToAuthChangesFulfilled(userProfile))
    } else {
      dispatch(listenToAuthChangesRejected())
    }
  })
}
