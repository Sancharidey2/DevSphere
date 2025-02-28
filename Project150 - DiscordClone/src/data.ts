import { Server, User } from './types';
import { format } from 'date-fns';

export const currentUser: User = {
  id: '1',
  username: 'CurrentUser',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  status: 'online',
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    username: 'JaneDoe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
  {
    id: '3',
    username: 'JohnSmith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'idle',
  },
  {
    id: '4',
    username: 'SarahWilliams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'dnd',
  },
  {
    id: '5',
    username: 'MikeBrown',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'offline',
  },
];

export const servers: Server[] = [
  {
    id: '1',
    name: 'General',
    icon: 'G',
    categories: [
      {
        id: '1',
        name: 'GENERAL',
        channels: [
          {
            id: '1',
            name: 'welcome',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Welcome to the server!',
                timestamp: format(new Date(2023, 5, 15, 12, 30), 'yyyy-MM-dd HH:mm:ss'),
                author: users[1],
              },
              {
                id: '2',
                content: 'Thanks for having me!',
                timestamp: format(new Date(2023, 5, 15, 12, 35), 'yyyy-MM-dd HH:mm:ss'),
                author: users[2],
              },
              {
                id: '3',
                content: 'How is everyone doing today?',
                timestamp: format(new Date(2023, 5, 15, 12, 40), 'yyyy-MM-dd HH:mm:ss'),
                author: users[3],
              },
            ],
          },
          {
            id: '2',
            name: 'general',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Has anyone seen the new movie?',
                timestamp: format(new Date(2023, 5, 16, 10, 15), 'yyyy-MM-dd HH:mm:ss'),
                author: users[1],
              },
              {
                id: '2',
                content: 'Yes, it was amazing!',
                timestamp: format(new Date(2023, 5, 16, 10, 20), 'yyyy-MM-dd HH:mm:ss'),
                author: users[3],
              },
              {
                id: '3',
                content: 'I haven\'t had a chance to see it yet.',
                timestamp: format(new Date(2023, 5, 16, 10, 25), 'yyyy-MM-dd HH:mm:ss'),
                author: users[4],
              },
            ],
          },
          {
            id: '3',
            name: 'voice-chat',
            type: 'voice',
            messages: [],
          },
        ],
      },
      {
        id: '2',
        name: 'GAMING',
        channels: [
          {
            id: '4',
            name: 'minecraft',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Anyone want to play Minecraft?',
                timestamp: format(new Date(2023, 5, 17, 14, 10), 'yyyy-MM-dd HH:mm:ss'),
                author: users[2],
              },
              {
                id: '2',
                content: 'I\'m in!',
                timestamp: format(new Date(2023, 5, 17, 14, 15), 'yyyy-MM-dd HH:mm:ss'),
                author: users[0],
              },
            ],
          },
          {
            id: '5',
            name: 'valorant',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Looking for a fifth for Valorant',
                timestamp: format(new Date(2023, 5, 18, 20, 5), 'yyyy-MM-dd HH:mm:ss'),
                author: users[3],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Coding',
    icon: 'C',
    categories: [
      {
        id: '1',
        name: 'GENERAL',
        channels: [
          {
            id: '1',
            name: 'welcome',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Welcome to the Coding server!',
                timestamp: format(new Date(2023, 5, 10, 9, 0), 'yyyy-MM-dd HH:mm:ss'),
                author: users[1],
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'LANGUAGES',
        channels: [
          {
            id: '2',
            name: 'javascript',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'What\'s your favorite JS framework?',
                timestamp: format(new Date(2023, 5, 11, 11, 30), 'yyyy-MM-dd HH:mm:ss'),
                author: users[2],
              },
              {
                id: '2',
                content: 'React all the way!',
                timestamp: format(new Date(2023, 5, 11, 11, 35), 'yyyy-MM-dd HH:mm:ss'),
                author: users[0],
              },
              {
                id: '3',
                content: 'I prefer Vue for smaller projects',
                timestamp: format(new Date(2023, 5, 11, 11, 40), 'yyyy-MM-dd HH:mm:ss'),
                author: users[3],
              },
            ],
          },
          {
            id: '3',
            name: 'python',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'Python is so versatile!',
                timestamp: format(new Date(2023, 5, 12, 15, 20), 'yyyy-MM-dd HH:mm:ss'),
                author: users[4],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Music',
    icon: 'M',
    categories: [
      {
        id: '1',
        name: 'GENERAL',
        channels: [
          {
            id: '1',
            name: 'welcome',
            type: 'text',
            messages: [],
          },
          {
            id: '2',
            name: 'music-chat',
            type: 'text',
            messages: [
              {
                id: '1',
                content: 'What are you all listening to today?',
                timestamp: format(new Date(2023, 5, 13, 18, 45), 'yyyy-MM-dd HH:mm:ss'),
                author: users[1],
              },
              {
                id: '2',
                content: 'Some lo-fi beats while coding',
                timestamp: format(new Date(2023, 5, 13, 18, 50), 'yyyy-MM-dd HH:mm:ss'),
                author: users[0],
              },
            ],
          },
        ],
      },
    ],
  },
];