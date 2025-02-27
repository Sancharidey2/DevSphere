import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServerView from './pages/ServerView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servers/:serverId" element={<ServerView />} />
        <Route path="/servers/:serverId/channels/:channelId" element={<ServerView />} />
      </Routes>
    </Router>
  );
}

export default App;