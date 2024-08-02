export interface IUserProfile {
  id: string
  email: string
  username: string
  avatar: any
  state?: boolean
  lastChanged?: string | Date
  joinedChats: string[]
}
