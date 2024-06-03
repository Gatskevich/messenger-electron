import AvailableChats from "@renderer/components/AvailableChats";
import JoinedChats from "@renderer/components/JoinedChats";
import ViewTitle from "@renderer/components/shared/ViewTitle";

export default function Home() {
  return (
    <div className="row g-0 fh">
      <div className="col-3 fh">
        <JoinedChats />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <AvailableChats />
      </div>
    </div>
  )
}
