import Loader from './Loade';


export default function LoadingView({message = 'Just one moment please...'}) {

  return (
    <div className="loading-screen">
      <div className="loading-view">
        <div className="loading-view-container">
          <div className="mb-3">{message}</div>
          <Loader />
        </div>
      </div>
    </div>
  )
}
