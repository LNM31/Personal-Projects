import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';
import type { ReactNode } from 'react';

type EventProps1 = {
  target: {
    value: string;
  }
}

type EventProps2 = {
  key: string;
}

type ChatMessage = {
  id: string;
  sender: string;
  message: ReactNode;
  time?: number;       
};

type ChatMessages = ChatMessage[];

type chatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: chatInputProps) 
{
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: EventProps1)
  {
    setInputText(event.target.value);
  }
  async function sendMessage() 
  {
    if(isLoading || inputText === '') return; 

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setInputText('');
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-spinner" src={LoadingSpinnerImage} />,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }
  function handleKeyDown(event: EventProps2) 
  {
    if(event.key === 'Enter'){
      sendMessage();
    }else if(event.key === 'Escape'){
      setInputText('');
    }
  }
  function resetOnClick()
  {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size={30} 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />           
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={resetOnClick}
        className="reset-button"
      >
        Clear
      </button>
    </div>
  );
}