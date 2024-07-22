import { createAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@renderer/store'

// Common actions
export const setOnlineStatus = createAction<boolean>('app/listenToConnectionChanges')

// Dispatching auth changes
export const listenToConnectionChanges = () => (dispatch: AppDispatch) => {
  const onStatusChange = () => {
    const isOnline = navigator.onLine
    dispatch(setOnlineStatus(isOnline))
  }

  window.addEventListener('online', onStatusChange)
  window.addEventListener('offline', onStatusChange)

  return () => {
    window.removeEventListener('online', onStatusChange)
    window.removeEventListener('offline', onStatusChange)
  }
}
