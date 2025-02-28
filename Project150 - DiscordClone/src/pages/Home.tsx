import React from 'react';
import ServerList from '../components/ServerList';
import DirectMessages from '../components/DirectMessages';
import { users } from '../data';

const Home: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ServerList />
      <DirectMessages />
      
      <div className="flex-1 flex flex-col h-screen">
        <div className="h-12 border-b border-discord-darkest flex items-center px-4 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2">
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.486 17.514 2 12 2ZM12 18.5C8.467 18.5 5.5 15.533 5.5 12C5.5 8.467 8.467 5.5 12 5.5C15.533 5.5 18.5 8.467 18.5 12C18.5 15.533 15.533 18.5 12 18.5Z"
            />
            <path
              fill="currentColor"
              d="M12 6.5C9.014 6.5 6.5 9.014 6.5 12C6.5 14.986 9.014 17.5 12 17.5C14.986 17.5 17.5 14.986 17.5 12C17.5 9.014 14.986 6.5 12 6.5Z"
              className="text-discord-primary"
            />
          </svg>
          <span className="font-bold text-white">Friends</span>
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex justify-center">
            <div className="bg-discord-darker rounded-lg p-8 text-center max-w-md">
              <div className="w-24 h-24 mx-auto mb-4 bg-discord-dark rounded-full flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24">
                  <g fill="none" fillRule="evenodd">
                    <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path>
                    <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                  </g>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No one's around to play with Wumpus.</h2>
              <p className="text-discord-lighter mb-6">
                Wumpus is waiting on friends. You don't have to though!
              </p>
              <button className="bg-discord-primary hover:bg-discord-secondary text-white font-medium py-2 px-4 rounded transition-colors">
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-60 h-screen bg-discord-darker overflow-y-auto p-3">
        <div className="mb-4">
          <div className="text-xs font-semibold text-discord-lighter uppercase mb-2">
            Active Now
          </div>
          <div className="bg-discord-dark rounded-lg p-4 text-center">
            <p className="text-discord-lighter text-sm mb-2">It's quiet for now...</p>
            <p className="text-xs text-discord-lighter">
              When friends start an activity—like playing a game or hanging out on voice—we'll show it here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;