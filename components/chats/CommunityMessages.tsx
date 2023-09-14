import ChatInput from "./ChatInput"
import CommunityChatArea from './CommunityChatArea'
type props={
  id:string;
  currentUserId:string;
}
const CommunityMessages = ({id,currentUserId}:props) => {
  return (
    <div>
      <CommunityChatArea communityId={id} currentUserId={currentUserId} />
      <ChatInput type="community" communityId={id}/>
    </div>
  )
}

export default CommunityMessages
