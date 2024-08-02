import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';
import { useParams } from 'react-router-dom';
import { withBaseLayout } from '@renderer/layouts/Base';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { subscribeToChat, subscribeToProfile } from '@renderer/actions/chats';
import { IUserProfile } from '@renderer/interfaces/IUserProfile';
import LoadingView from '@renderer/components/shared/LoadingView/LoadingView';
import Messenger from '@renderer/components/Messenger';

function Chat() {
  const { id } = useParams();

  const peopleWatchers = useRef({});

  const dispatch = useDispatch<AppDispatch>();

  const activeChat = useSelector(({chats}: RootState) => chats.activeChats[id || ""])

  const subscribeToJoinedUsers = useCallback((joinedUsers: IUserProfile[]) => {
    joinedUsers.forEach(user => {
      if(!peopleWatchers.current[user.id]) {
        peopleWatchers.current[user.id] = dispatch(subscribeToProfile(user.id, id || ""))
      }
    })
  }, [dispatch, id])

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current)
      .forEach(id => peopleWatchers.current[id]())
  }, [peopleWatchers.current])

  const sendMessage = (message: string) => {
    alert(message);
  }

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

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />
  }

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh position-relative">
        <ViewTitle text={`Channel ${activeChat?.name}`} />
        <ChatMessagesList />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  )
}

export default  withBaseLayout(Chat, { canGoBack: true });
