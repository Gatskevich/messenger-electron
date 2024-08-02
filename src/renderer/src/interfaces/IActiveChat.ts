import { IUserProfile } from './IUserProfile'

export interface IActiveChat {
  id?: string
  name: string
  description: string
  image: any
  admin: string
  joinedUsers?: IUserProfile[]
}
