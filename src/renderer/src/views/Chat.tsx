import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';
import { useParams } from 'react-router-dom';
import { withBaseLayout } from '@renderer/layouts/Base';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { subscribeToChat, subscribeToProfile } from '@renderer/actions/chats';
import { IUserProfile } from '@renderer/interfaces/IUserProfile';

function Chat() {
  const { id } = useParams();

  const peopleWatchers = useRef({});

  const dispatch = useDispatch<AppDispatch>();
  const activeChat = useSelector(({chats}: RootState) => chats.activeChats[id || ""])

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id || ""));

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    }
  }, [])

  useEffect(() => {
    activeChat?.joinedUsers && subscribeToJoinedUsers(activeChat.joinedUsers);
  }, [activeChat?.joinedUsers])

  const subscribeToJoinedUsers = (joinedUsers: IUserProfile[]) => {
    joinedUsers.forEach(user => {
      if(!peopleWatchers.current[user.id]) {
        peopleWatchers.current[user.id] = dispatch(subscribeToProfile(user.id))
      }
    })
  }

  const unsubFromJoinedUsers = () => {
    Object.keys(peopleWatchers.current)
      .forEach(id => peopleWatchers.current[id]())
  }

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel ${activeChat?.name}`} />
        <ChatMessagesList />
      </div>
    </div>
  )
}

export default  withBaseLayout(Chat, { canGoBack: true });
