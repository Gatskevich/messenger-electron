import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  listenToAuthChangesFulfilled,
  listenToAuthChangesPending,
  listenToAuthChangesRejected,
  loginUser,
  registerUser
} from '@renderer/actions/auth'
import { IUserProfile } from '@renderer/interfaces/IUserProfile'
import { IFirebaseError } from '@renderer/interfaces/IFirebaseError'
import { IAuth } from '@renderer/interfaces/IAuth'

export interface AuthState {
  user: IUserProfile | null
  isChecking: boolean
  login: IAuth
  register: IAuth
}

const initialState: AuthState = {
  user: null,
  isChecking: false,
  login: {
    isChecking: false,
    error: null
  },
  register: {
    isChecking: false,
    error: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    listenToAuthChangesPending: (state) => {
      state.isChecking = true
    },
    listenToAuthChangesFulfilled: (state, action) => {
      state.isChecking = false
      state.user = action.payload
    },
    listenToAuthChangesRejected: (state) => {
      state.isChecking = false
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.register.isChecking = true
        state.register.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.isChecking = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.isChecking = false
        state.register.error = action.error as IFirebaseError
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.login.isChecking = true
        state.login.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.isChecking = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.isChecking = false
        state.login.error = action.error as IFirebaseError
      })
  }
})

export default authSlice.reducer
