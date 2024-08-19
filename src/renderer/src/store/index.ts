import { configureStore } from '@reduxjs/toolkit'
import appMiddleware from './middlewares/app'
import rootReducer from '@renderer/slices/root'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
