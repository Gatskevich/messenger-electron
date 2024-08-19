import { Unsubscribe } from '@reduxjs/toolkit'

export interface IMessagesSubscriptions {
  [key: string]: Unsubscribe
}
