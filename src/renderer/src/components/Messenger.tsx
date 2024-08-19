import { IMessage } from '@renderer/interfaces/IMessage';
import { createTimestamp } from '@renderer/utils/time';
import { useState } from 'react';

interface MessengerProps {
  onSubmit: (data: IMessage) => void
}

export default function Messenger({ onSubmit }: MessengerProps) {
  const [value, setValue] = useState('');

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setValue('');
    }
  }

  const sendMessage = () => {
    if (value.trim() === '') { return; }

    const message = {
      content: value.trim(),
      timestamp: createTimestamp()
    }

    onSubmit(message);
  }

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyPress}
        value={value}
        rows={3}
        className="form-control"
        placeholder="Type your message here..">
      </textarea>
    </div>
  )
}
