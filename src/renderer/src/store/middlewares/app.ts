import Notification from '../../utils/notifications'

export default (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case 'app/listenToConnectionChanges': {
      Notification.show({
        title: 'Connection status:',
        body: action.payload ? 'Online' : 'Offline'
      })
    }
  }

  next(action)
}
