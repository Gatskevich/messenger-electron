import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Settings from './views/Settings';
import Login from './views/Login';
import Register from './views/Register';
import Chat from './views/Chat';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='content-wrapper'>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
