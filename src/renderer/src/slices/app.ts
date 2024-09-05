import { createSlice } from '@reduxjs/toolkit'
import { updateSettings } from '@renderer/actions/settings'
import storage from '@renderer/utils/storage'

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
  },
  extraReducers: (builder) => {
    builder.addCase(updateSettings, (_, action) => {
      const { setting, value } = action.payload

      const currentSettings = storage.getItem('app-settings')
      const settings = { ...currentSettings, [setting]: value }
      storage.setItem('app-settings', settings)
    })
  }
})

export default appSlice.reducer
