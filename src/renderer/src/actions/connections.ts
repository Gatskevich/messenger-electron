import { createAction } from '@reduxjs/toolkit'
import * as api from '../api/connections'
import { AppDispatch } from '@renderer/store'

// Common actions
export const checkUserConnectionFulfilled = createAction('connection/checkUserConnectionFulfilled')

// Dispatching auth changes
export const checkUserConnection = (id: string) => (dispatch: AppDispatch) => {
  return api.onConnectionChanged((isConnected: boolean) => {
    api.setUserOnlineStatus(id, isConnected)

    dispatch(checkUserConnectionFulfilled())
  })
}
