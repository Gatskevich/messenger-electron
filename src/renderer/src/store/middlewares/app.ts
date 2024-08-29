import Notification from '../../utils/notifications'

export default (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case 'app/listenToConnectionChanges': {
      const { showNotifications } = store.getState().settings
      if (showNotifications) {
        Notification.show({
          title: 'Connection status:',
          body: action.isOnline ? 'Online' : 'Offline'
        })
      }
    }
  }

  next(action)
}
