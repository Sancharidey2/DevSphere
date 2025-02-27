import React from 'react';
import { User } from '../types';
import { users } from '../data';

const UserList: React.FC = () => {
  // Group users by status
  const onlineUsers = users.filter(user => user.status === 'online');
  const idleUsers = users.filter(user => user.status === 'idle');
  const dndUsers = users.filter(user => user.status === 'dnd');
  const offlineUsers = users.filter(user => user.status === 'offline');

  const renderUserGroup = (title: string, userList: User[]) => (
    <div className="mb-4">
      <div className="text-xs font-semibold text-discord-lighter uppercase mb-2">
        {title} — {userList.length}
      </div>
      {userList.map(user => (
        <div key={user.id} className="flex items-center py-1 px-2 hover:bg-discord-light rounded cursor-pointer">
          <div className="relative mr-3">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-8 h-8 rounded-full"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-discord-darker
              ${user.status === 'online' ? 'bg-discord-success' : 
                user.status === 'idle' ? 'bg-discord-warning' : 
                user.status === 'dnd' ? 'bg-discord-danger' : 'bg-discord-light'}`}
            />
          </div>
          <span className="text-discord-lighter">{user.username}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-60 h-screen bg-discord-darker overflow-y-auto p-3">
      <div className="mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-discord-darkest rounded p-1 px-2 text-sm text-discord-lighter outline-none"
          />
        </div>
      </div>
      
      {onlineUsers.length > 0 && renderUserGroup('Online', onlineUsers)}
      {idleUsers.length > 0 && renderUserGroup('Idle', idleUsers)}
      {dndUsers.length > 0 && renderUserGroup('Do Not Disturb', dndUsers)}
      {offlineUsers.length > 0 && renderUserGroup('Offline', offlineUsers)}
    </div>
  );
};

export default UserList;