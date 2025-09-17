import { useAutoScroll } from "../utility-functions/functions.jsx";
import { ChatMessage } from "./ChatMessage.jsx";
import './ChatMessages.css'

function ChatMessages({chatMessages})
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