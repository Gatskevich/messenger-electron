import { IMessage } from './IMessage'

export interface ISetMessages {
  chatId: string
  messages: IMessage[]
}
