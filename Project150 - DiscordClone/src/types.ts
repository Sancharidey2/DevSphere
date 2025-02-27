export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  author: User;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  messages: Message[];
}

export interface Category {
  id: string;
  name: string;
  channels: Channel[];
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
}