import { combineReducers } from 'redux'
import chatSlice from '@renderer/slices/chats'
import authSlice from '@renderer/slices/auth'
import appSlice from '@renderer/slices/app'
import { logoutFulfilled } from '@renderer/actions/auth'

const appReducer = combineReducers({
  chats: chatSlice,
  auth: authSlice,
  app: appSlice
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === logoutFulfilled.type) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer
