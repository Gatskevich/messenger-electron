import { Unsubscribe } from '@reduxjs/toolkit'

export interface IMessageSubscription {
  sub: Unsubscribe
  chatId: string
}
