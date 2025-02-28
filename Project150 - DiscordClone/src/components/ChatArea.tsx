import React, { useState, useRef, useEffect } from 'react';
import { Channel, Message, User } from '../types';
import { Hash, PlusCircle, AtSign, Smile, Gift, AArrowDown as GIF, Paperclip } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { currentUser } from '../data';

interface ChatAreaProps {
  channel: Channel;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channel }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(channel.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(channel.messages);
  }, [channel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      author: currentUser,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, show the time
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'h:mm a');
    }
    
    // If it's within the last week, show the day
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    // Otherwise show the date
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="h-12 border-b border-discord-darkest flex items-center px-4 shadow-sm">
        <Hash size={24} className="text-discord-lighter mr-2" />
        <span className="font-bold text-white">{channel.name}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-discord-lighter">
            <div className="w-16 h-16 rounded-full bg-discord-light flex items-center justify-center mb-4">
              <Hash size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to #{channel.name}!</h3>
            <p className="text-center max-w-md">
              This is the start of the #{channel.name} channel. Send a message to start the conversation.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Check if this message is from the same author as the previous one
            const prevMsg = index > 0 ? messages[index - 1] : null;
            const isContinuation = prevMsg && prevMsg.author.id === msg.author.id;
            
            return (
              <div key={msg.id} className={`flex ${isContinuation ? 'mt-0.5' : 'mt-4'}`}>
                {!isContinuation && (
                  <img 
                    src={msg.author.avatar} 
                    alt={msg.author.username} 
                    className="w-10 h-10 rounded-full mr-3 mt-0.5"
                  />
                )}
                {isContinuation && <div className="w-10 mr-3"></div>}
                
                <div className="flex-1">
                  {!isContinuation && (
                    <div className="flex items-center">
                      <span className="font-medium text-white">{msg.author.username}</span>
                      <span className="text-xs text-discord-lighter ml-2">
                        {formatMessageTime(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <p className="text-discord-lighter">{msg.content}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSendMessage}>
          <div className="relative">
            <PlusCircle size={20} className="absolute left-4 top-4 text-discord-lighter" />
            <textarea
              className="message-input pl-12"
              placeholder={`Message #${channel.name}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              rows={1}
            />
            <div className="absolute right-4 top-4 flex space-x-2 text-discord-lighter">
              <Gift size={20} className="cursor-pointer hover:text-white" />
              <GIF size={20} className="cursor-pointer hover:text-white" />
              <Paperclip size={20} className="cursor-pointer hover:text-white" />
              <Smile size={20} className="cursor-pointer hover:text-white" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;