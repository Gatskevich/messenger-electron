import { RootState } from '@renderer/store';
import Loader from './Loade';
import { useSelector } from 'react-redux';


export default function LoadingView({message = 'Just one moment please...'}) {
  const isDarkTheme = useSelector(({settings}: RootState) => settings.isDarkTheme);

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <div className="loading-screen">
        <div className="loading-view">
          <div className="loading-view-container">
            <div className="mb-3">{message}</div>
            <Loader />
          </div>
        </div>
      </div>
    </div>
  )
}
