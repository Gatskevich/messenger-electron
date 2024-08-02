import { joinChat } from "@renderer/actions/chats";
import { IChat } from "@renderer/interfaces/IChat"
import { AppDispatch, RootState } from "@renderer/store";
import { useDispatch, useSelector } from "react-redux";

interface AvailableChatsListProps {
  chats: IChat[];
}

export default function AvailableChatsList({ chats }: AvailableChatsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(({auth}: RootState) => auth.user);

  const askForConfirmation = (chat: IChat) => {
    const isConfirming = confirm(`Do you want to join the chat: ${chat.name} ?`);

    if (isConfirming) {
      dispatch(joinChat(chat, user?.id || ''));
    }
  }

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        {
          chats.map(chat =>
            (<div
              key={chat.id}
              className="col-lg-3 col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{chat.name}</h5>
                  <p className="card-text">{chat.description}</p>
                  <button
                    onClick={() => askForConfirmation(chat)}
                    className="btn btn-outline-primary">Join Chat</button>
                </div>
              </div>
            </div>))
        }
      </div>
    </div>
  )
}
