import { useAutoScroll } from "../utility-functions/functions.jsx";
import { ChatMessage } from "./ChatMessage.tsx";
import './ChatMessages.css'

type chatMessagesProps = {
  chatMessages: {
    id: string;
    sender: string;
    message: string;
    time: number;
  }[];
};

function ChatMessages({chatMessages}: chatMessagesProps)
{
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              time={chatMessage.time} 
              key={chatMessage.id}
            />
          );
        })
      }
    </div>
  );
}

export default ChatMessages;