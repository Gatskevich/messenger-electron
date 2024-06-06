export default function ChatMessagesList() {
  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        <li
          className="chat-left">
          <div className="chat-avatar">
            <img
              src="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg" alt="Retail Admin" />
            <div className="chat-name">Test User 1</div>
          </div>
          <div className="chat-text-wrapper">
            <span className="chat-text">Some message 1</span>
            <span className="chat-spacer"></span>
            <div className="chat-hour">5h ago</div>
          </div>
        </li>
        <li
          className="chat-right">
          <div className="chat-avatar">
            <img
              src="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg" alt="Retail Admin" />
            <div className="chat-name">Test User 2</div>
          </div>
          <div className="chat-text-wrapper">
            <span className="chat-text">Some message 2</span>
            <span className="chat-spacer"></span>
            <div className="chat-hour">5h ago</div>
          </div>
        </li>
        <li
          className="chat-left">
          <div className="chat-avatar">
            <img
              src="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg" alt="Retail Admin" />
            <div className="chat-name">Test User 3</div>
          </div>
          <div className="chat-text-wrapper">
            <span className="chat-text">Some message 3</span>
            <span className="chat-spacer"></span>
            <div className="chat-hour">5h ago</div>
          </div>
        </li>
        <li
          className="chat-right">
          <div className="chat-avatar">
            <img
              src="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg" alt="Retail Admin" />
            <div className="chat-name">Test User 4</div>
          </div>
          <div className="chat-text-wrapper">
            <span className="chat-text">Some message 4</span>
            <span className="chat-spacer"></span>
            <div className="chat-hour">5h ago</div>
          </div>
        </li>
      </ul>
    </div>
  )
}
