import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary"
          >
            Back
          </button>
          <Link
            to="/settings"
            className="btn btn-outline-success ms-2">Settings</Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-outline-danger ms-2"
          >
            Register
          </button>
          <Link
            to="/login"
            className="btn btn-outline-success ms-2">Login</Link>
        </div>
      </nav>
    </div>
  )
}
