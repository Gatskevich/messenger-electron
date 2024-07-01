import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Settings from './views/Settings';
import Chat from './views/Chat';
import { Provider } from 'react-redux';
import { store } from './store';
import Welcome from './views/Welcom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='content-wrapper'>
          <Routes>
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
