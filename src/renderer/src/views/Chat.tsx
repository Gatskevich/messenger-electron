import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';
import { useParams } from 'react-router-dom';
import { withBaseLayout } from '@renderer/layouts/Base';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { registerMessageSubscription, sendChatMessage, subscribeToChat, subscribeToMessages, subscribeToProfile } from '@renderer/actions/chats';
import { IUserProfile } from '@renderer/interfaces/IUserProfile';
import LoadingView from '@renderer/components/shared/LoadingView/LoadingView';
import Messenger from '@renderer/components/Messenger';
import { IMessage } from '@renderer/interfaces/IMessage';

function Chat() {
  const { id } = useParams();

  const peopleWatchers = useRef({});
  const messageList = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const activeChat = useSelector(({chats}: RootState) => chats.activeChats[id || ""])
  const messages = useSelector(({chats}: RootState) => chats.messages[id || ""])
  const messagesSubscriptions = useSelector(({chats}: RootState) => chats.messagesSubscriptions[id|| ""])

  const subscribeToJoinedUsers = useCallback((joinedUsers: IUserProfile[]) => {
    const newWatchers: { [key: string]: () => void } = {};

    Object.keys(peopleWatchers.current).forEach(userId => {
      if (!joinedUsers.some(user => user.id === userId)) {
        peopleWatchers.current[userId]();
      } else {
        newWatchers[userId] = peopleWatchers.current[userId];
      }
    });

    joinedUsers.forEach(user => {
      if (!newWatchers[user.id]) {
        newWatchers[user.id] = dispatch(subscribeToProfile(user.id, id || ""));
      }
    });

    peopleWatchers.current = newWatchers;
  }, [dispatch, id]);

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach(userId => {
      peopleWatchers.current[userId]();
    });
  }, [peopleWatchers.current])

  const sendMessage = useCallback((message: IMessage) => {
    dispatch(sendChatMessage(message, id || "")).then(_ => messageList.current && messageList.current.scrollIntoView(false))
  }, [id])

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id || ""));

    if (!messagesSubscriptions)  {
      const unsubFromMessages = dispatch(subscribeToMessages(id || ""));
      dispatch(registerMessageSubscription({chatId: id || "", sub: unsubFromMessages}));
    }

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    }
  }, []);

  useEffect(() => {
    activeChat?.joinedUsers && subscribeToJoinedUsers(activeChat.joinedUsers);
  }, [activeChat?.joinedUsers, subscribeToJoinedUsers]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />
  }

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh position-relative">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessagesList innerRef={messageList} messages={messages}/>
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  )
}

export default  withBaseLayout(Chat, { canGoBack: true });
