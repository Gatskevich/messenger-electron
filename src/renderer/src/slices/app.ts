import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  isOnline: boolean
}

const initialState: AppState = {
  isOnline: navigator.onLine
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    listenToConnectionChanges: (state, action) => {
      state.isOnline = action.payload
    }
  }
})

export default appSlice.reducer
