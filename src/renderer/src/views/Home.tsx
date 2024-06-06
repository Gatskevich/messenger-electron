import AvailableChatsList from "@renderer/components/AvailableChatsList";
import JoinedChatsList from "@renderer/components/JoinedChatsList";
import ViewTitle from "@renderer/components/shared/ViewTitle";

export default function Home() {
  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <JoinedChatsList />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <AvailableChatsList />
      </div>
    </div>
  )
}
