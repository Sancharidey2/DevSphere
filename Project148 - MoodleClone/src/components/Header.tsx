import React from 'react';
import { Bell, MessageSquare, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">EduLearn</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MessageSquare size={20} />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                <User size={20} />
                <span className="hidden md:block">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;