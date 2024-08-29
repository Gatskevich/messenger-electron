import { createAction } from '@reduxjs/toolkit'
import { ISettingsFormInput } from '@renderer/interfaces/ISettingsFormInput'

export const updateSettings = createAction<ISettingsFormInput>('settings/updateSettings')

export const loadInitialSettings = createAction('settings/loadInitialSettings')
