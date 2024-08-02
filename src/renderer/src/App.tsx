import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import Chat from './views/Chat';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from './store';
import Welcome from './views/Welcom';
import { listenToAuthChanges } from './actions/auth';
import { useEffect } from 'react';
import LoadingView from './components/shared/LoadingView/LoadingView';
import { listenToConnectionChanges } from './actions/app';
import ChatCreate from './views/ChatCreate';
import { checkUserConnection } from './actions/connections';
import { setUserOnlineStatus } from './api/connections';

function AuthRoute({children}) {
  const user = useSelector(({auth}: RootState) => auth.user)

  if (!user) {
    return <Navigate to="/" />;
  }

  return children

}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isChecking = useSelector(({auth}: RootState) => auth.isChecking)
  const isOnline = useSelector(({app}: RootState) => app.isOnline);
  const user = useSelector(({auth}: RootState) => auth.user);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    }
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.id) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.id));
    }

    return () => {
      if (unsubFromUserConnection) {
        unsubFromUserConnection();
        if (user?.id) {
          setUserOnlineStatus(user.id, false);
        }
      }
    }
  }, [dispatch, user])

  if (!isOnline) {
    return <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
  }

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <Provider store={store}>
      <Router>
        <div className='content-wrapper'>
          <Routes>
            <Route path="/chatCreate" element={
              <AuthRoute>
                <ChatCreate />
              </AuthRoute>
            } />
            <Route path="/chat/:id" element={
              <AuthRoute>
                <Chat />
              </AuthRoute>
            } />
            <Route path="/settings" element={
              <AuthRoute>
                <Settings />
              </AuthRoute>
            } />
            <Route path="/home" element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            } />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
