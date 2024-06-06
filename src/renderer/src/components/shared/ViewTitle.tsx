interface ViewTitleProps {
  text: string;
}

export default function ViewTitle({ text }: ViewTitleProps) {

  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <a
        href="/"
        className="btn btn-primary btn-sm back-button">Back</a>
    </div>
  )
}
