import { logout } from '@renderer/actions/auth';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(({auth}: RootState) => auth.user)

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
          { user &&
              <>
              <img className="avatar me-2" src={user.avatar}></img>
              <span className="logged-in-user">Hi, {user.username}</span>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-outline-danger ms-4">Logout
              </button>
            </>
          }
          <Link
            to="/"
            className="btn btn-outline-success ms-2">Login</Link>
        </div>
      </nav>
    </div>
  )
}
