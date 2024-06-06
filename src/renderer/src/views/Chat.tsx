import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';

export default function Chat() {
  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <ChatMessagesList />
      </div>
    </div>
  )
}
