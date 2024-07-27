import AvailableChatsList from "@renderer/components/AvailableChatsList";
import JoinedChatsList from "@renderer/components/JoinedChatsList";
import ViewTitle from "@renderer/components/shared/ViewTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../actions/chats';
import { AppDispatch, RootState } from "@renderer/store";
import { withBaseLayout } from "@renderer/layouts/Base";
import Notification from '../utils/notifications';
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(({auth}: RootState) => auth.user);
  const availableChats = useSelector(({chats}: RootState) => {
    return chats.available
  })
  const joinedChats = useSelector(({chats}: RootState) => {
    return chats.joined
  })

  useEffect(() => {
    Notification.setup();
    dispatch(getChats(user))
  }, [dispatch])

  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats} />
      </div>
      <div className="col-9 fh">
          <ViewTitle text="Choose your channel">
            <Link
              className="btn btn-outline-primary"
              to="/chatCreate">New</Link>
          </ViewTitle>
        <AvailableChatsList chats={availableChats} />
      </div>
    </div>
  )
}

export default withBaseLayout(Home);
