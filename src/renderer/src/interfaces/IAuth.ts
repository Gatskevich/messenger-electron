import { IFirebaseError } from './IFirebaseError'

export interface IAuth {
  isChecking: boolean
  error: IFirebaseError | null
}
