import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Users, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
  ];

  const bottomNavItems = [
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
    { name: 'Logout', path: '/login', icon: <LogOut size={20} /> },
  ];

  const NavItem = ({ item }: { item: typeof navItems[0] }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-gray-600 transition-colors duration-200 ${
          isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'hover:bg-gray-100'
        }`
      }
    >
      <span className="mr-3">{item.icon}</span>
      <span>{item.name}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">EduLearn LMS</h2>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
        <div className="border-t">
          <nav>
            {bottomNavItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;