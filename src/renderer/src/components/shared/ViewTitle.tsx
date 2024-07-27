import { ReactNode } from "react";

interface ViewTitleProps {
  text: string;
  children: ReactNode;
}

export default function ViewTitle({text, children}: ViewTitleProps) {

  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div>{children}</div>
    </div>
  )
}
