import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <Link
            to="/settings"
            className="btn btn-outline-success ms-2">Settings</Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <Link
             to="/register"
            className="btn btn-sm btn-outline-danger ms-2">Register</Link>
          <Link
            to="/login"
            className="btn btn-sm btn-outline-success ms-2">Login</Link>
        </div>
      </nav>
    </div>
  )
}
