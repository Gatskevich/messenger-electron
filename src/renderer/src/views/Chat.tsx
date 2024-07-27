import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';
import { useParams } from 'react-router-dom';
import { withBaseLayout } from '@renderer/layouts/Base';

function Chat() {
  const { id } = useParams();

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`} >

        </ViewTitle>
        <ChatMessagesList />
      </div>
    </div>
  )
}

export default  withBaseLayout(Chat, { canGoBack: true });
