import { useState } from 'react';

interface MessengerProps {
  onSubmit: (value: string) => void
}

export default function Messenger({ onSubmit }: MessengerProps) {
  const [value, setValue] = useState('');

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
      setValue('');
    }
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
