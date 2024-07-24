import AvailableChatsList from "@renderer/components/AvailableChatsList";
import JoinedChatsList from "@renderer/components/JoinedChatsList";
import ViewTitle from "@renderer/components/shared/ViewTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../actions/chats';
import { AppDispatch, RootState } from "@renderer/store";
import { withBaseLayout } from "@renderer/layouts/Base";
import Notification from '../utils/notifications';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector(({chats}: RootState) => {
    return chats.items
  })

  useEffect(() => {
    Notification.setup();
    dispatch(getChats())
  }, [dispatch])

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel" />
        <AvailableChatsList  chats={chats} />
      </div>
    </div>
  )
}

export default withBaseLayout(Home);
