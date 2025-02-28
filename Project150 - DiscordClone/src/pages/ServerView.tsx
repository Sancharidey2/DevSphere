import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ServerList from '../components/ServerList';
import ChannelList from '../components/ChannelList';
import ChatArea from '../components/ChatArea';
import UserList from '../components/UserList';
import { servers } from '../data';

const ServerView: React.FC = () => {
  const { serverId, channelId } = useParams<{ serverId: string; channelId: string }>();
  
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    return <Navigate to="/" />;
  }
  
  // Find the channel, or default to the first text channel
  let channel = null;
  
  if (channelId) {
    // Find the channel across all categories
    for (const category of server.categories) {
      const foundChannel = category.channels.find(c => c.id === channelId);
      if (foundChannel) {
        channel = foundChannel;
        break;
      }
    }
  }
  
  // If no channel is found or specified, use the first text channel
  if (!channel) {
    for (const category of server.categories) {
      const firstTextChannel = category.channels.find(c => c.type === 'text');
      if (firstTextChannel) {
        channel = firstTextChannel;
        break;
      }
    }
  }
  
  if (!channel) {
    return <div>No channels available</div>;
  }
  
  return (
    <div className="flex h-screen">
      <ServerList />
      <ChannelList server={server} />
      <ChatArea channel={channel} />
      <UserList />
    </div>
  );
};

export default ServerView;