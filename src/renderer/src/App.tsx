import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='content-wrapper'>
        <Routes>
          <Route path="/settings" element={<h1>I am Settings View</h1>} />
          <Route path="/login" element={<h1>I am Login View</h1>} />
          <Route path="/register" element={<h1>I am Register View</h1>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
