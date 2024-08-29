import { createSlice } from '@reduxjs/toolkit'
import { updateSettings } from '@renderer/actions/settings'
import storage from '@renderer/utils/storage'

export interface SettingsState {
  isDarkTheme: boolean
  playSound: boolean
  showNotifications: boolean
  savable: boolean
}

const initialState: SettingsState = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
  savable: true
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadInitialSettings: (state) => {
      const storedSettings = storage.getItem('app-settings')

      Object.assign(state, storedSettings)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateSettings, (state, action) => {
      const { setting, value } = action.payload
      state[setting] = value
    })
  }
})

export default settingsSlice.reducer
