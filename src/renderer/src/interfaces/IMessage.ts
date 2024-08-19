import { IUserProfile } from './IUserProfile'

export interface IMessage {
  content: string
  timestamp: string
  author?: string | IUserProfile
  id?: string
}
