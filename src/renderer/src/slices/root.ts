import { combineReducers } from 'redux'
import chatSlice from '@renderer/slices/chats'
import authSlice from '@renderer/slices/auth'
import appSlice from '@renderer/slices/app'
import { logoutFulfilled } from '@renderer/actions/auth'
import settingsSlice from './settings'

const appReducer = combineReducers({
  chats: chatSlice,
  auth: authSlice,
  app: appSlice,
  settings: settingsSlice
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === logoutFulfilled.type && state) {
    Object.keys(state).forEach((sk) => {
      if (state[sk].savable) {
        return
      }

      state[sk] = undefined
    })
  }

  return appReducer(state, action)
}

export default rootReducer
