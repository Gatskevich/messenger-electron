import { IMessage } from "@renderer/interfaces/IMessage"
import { IUserProfile } from "@renderer/interfaces/IUserProfile"
import { RootState } from "@renderer/store";
import { formatTimeAgo } from "@renderer/utils/time";
import { Ref, useCallback } from "react";
import { useSelector } from "react-redux";

interface IChatMessagesListProps {
  messages: IMessage[]
  innerRef: Ref<HTMLUListElement>
}

export default function ChatMessagesList({ messages = [], innerRef }: IChatMessagesListProps) {
  const user = useSelector(({auth}: RootState) => auth.user);

  const isAuthorOf = useCallback(message => {
    return message?.author.id === user?.id ? 'chat-right' : 'chat-left';
  }, [])

  return (
    <div className="chat-container">
      <ul ref={innerRef} className="chat-box chatContainerScroll">
        { messages.map(message =>
          <li
            key={message.id}
            className={isAuthorOf(message)}>
            <div className="chat-avatar">
              <img
                src={(message?.author as IUserProfile).avatar}
                alt="Retail Admin" />
              <div className="chat-name">{(message?.author as IUserProfile).username}</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">{formatTimeAgo(message.timestamp)}</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
