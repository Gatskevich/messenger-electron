import { formatDistanceToNow } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const createTimestamp = () => {
  return Timestamp.now().toMillis().toString()
}

export const formatTimeAgo = (timestamp: string) => {
  const timestampInMilliseconds = parseInt(timestamp, 10)
  const result = formatDistanceToNow(new Date(timestampInMilliseconds), { addSuffix: true })

  return result
}
