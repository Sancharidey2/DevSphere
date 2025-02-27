import React, { useState } from 'react';
import { Server, Category, Channel } from '../types';
import { Hash, Volume2, ChevronDown, ChevronRight, Plus, Settings } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

interface ChannelListProps {
  server: Server;
}

const ChannelList: React.FC<ChannelListProps> = ({ server }) => {
  const { channelId } = useParams<{ channelId: string }>();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(server.categories.map(category => [category.id, true]))
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="w-60 h-screen bg-discord-darker flex flex-col">
      <div className="p-4 border-b border-discord-darkest shadow-sm flex justify-between items-center">
        <h2 className="font-bold text-white truncate">{server.name}</h2>
        <ChevronDown size={20} className="text-discord-lighter" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {server.categories.map((category: Category) => (
          <div key={category.id}>
            <div 
              className="flex items-center text-xs font-semibold text-discord-lighter mb-1 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              {expandedCategories[category.id] ? (
                <ChevronDown size={12} className="mr-1" />
              ) : (
                <ChevronRight size={12} className="mr-1" />
              )}
              {category.name}
            </div>
            
            {expandedCategories[category.id] && (
              <div className="space-y-0.5">
                {category.channels.map((channel: Channel) => (
                  <Link 
                    key={channel.id} 
                    to={`/servers/${server.id}/channels/${channel.id}`}
                    className={`channel ${channelId === channel.id ? 'channel-active' : ''}`}
                  >
                    {channel.type === 'text' ? (
                      <Hash size={18} className="mr-2 text-discord-lighter" />
                    ) : (
                      <Volume2 size={18} className="mr-2 text-discord-lighter" />
                    )}
                    <span className="truncate">{channel.name}</span>
                  </Link>
                ))}
                <div className="channel opacity-60 hover:opacity-100">
                  <Plus size={18} className="mr-2" />
                  <span>Add Channel</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-2 bg-discord-darkest flex items-center">
        <div className="flex-1 flex items-center">
          <div className="w-8 h-8 rounded-full bg-discord-primary mr-2 flex items-center justify-center">
            <span className="text-white font-medium">U</span>
          </div>
          <div>
            <div className="text-sm font-medium text-white">Username</div>
            <div className="text-xs text-discord-lighter">#1234</div>
          </div>
        </div>
        <Settings size={18} className="text-discord-lighter" />
      </div>
    </div>
  );
};

export default ChannelList;