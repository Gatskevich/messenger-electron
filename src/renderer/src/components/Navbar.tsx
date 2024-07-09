import { logout } from '@renderer/actions/auth';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackButton from './shared/BackButton';

export interface NavbarProps {
  canGoBack?: boolean;
  view?: string
}

export default function Navbar({ canGoBack, view }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(({auth}: RootState) => auth.user)

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          { canGoBack && <BackButton /> }
          { view !== 'Settings' &&
            <Link
              to="/settings"
              className="btn btn-outline-success ml-2">Settings
            </Link>
          }
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
        </div>
      </nav>
    </div>
  )
}
