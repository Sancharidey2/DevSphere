import React, { useState } from 'react';
import { Github, Star, GitFork, Eye, Code2, CircleDot, Play, Shield, Grape as Graph, BookOpen, FileCode, Folder, ChevronDown, Bell, Plus, Search } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('code');

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Github className="h-8 w-8" />
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search or jump to..." 
                className="bg-gray-800 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 border border-gray-600 rounded px-1 text-xs text-gray-400">/</div>
            </div>
            <nav className="hidden md:flex space-x-4 text-sm font-medium">
              <a href="#" className="hover:text-gray-300">Pull requests</a>
              <a href="#" className="hover:text-gray-300">Issues</a>
              <a href="#" className="hover:text-gray-300">Marketplace</a>
              <a href="#" className="hover:text-gray-300">Explore</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5" />
            <div className="flex items-center">
              <Plus className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </header>

      {/* Repo Header */}
      <div className="border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center text-sm mb-4">
            <Github className="h-4 w-4 mr-1" />
            <a href="#" className="text-blue-600 hover:underline">facebook</a>
            <span className="mx-1">/</span>
            <a href="#" className="text-blue-600 hover:underline font-semibold">react</a>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full border border-gray-300">Public</span>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
              <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                <Star className="h-4 w-4" />
                <span>Star</span>
                <span className="ml-1">214k</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                <GitFork className="h-4 w-4" />
                <span>Fork</span>
                <span className="ml-1">44.2k</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                <Eye className="h-4 w-4" />
                <span>Watch</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'code' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <Code2 className="h-4 w-4 mr-2" />
              Code
            </button>
            <button 
              onClick={() => setActiveTab('issues')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'issues' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <CircleDot className="h-4 w-4 mr-2" />
              Issues
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100">534</span>
            </button>
            <button 
              onClick={() => setActiveTab('pulls')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'pulls' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <GitFork className="h-4 w-4 mr-2" />
              Pull requests
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100">76</span>
            </button>
            <button 
              onClick={() => setActiveTab('actions')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'actions' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <Play className="h-4 w-4 mr-2" />
              Actions
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'security' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'insights' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <Graph className="h-4 w-4 mr-2" />
              Insights
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4">
          {activeTab === 'code' && (
            <div>
              {/* Branch selector and buttons */}
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-2 mb-3 md:mb-0">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                    <GitFork className="h-4 w-4" />
                    <span>main</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                    <span className="text-gray-600">Go to file</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium">
                    <span className="text-gray-600">Add file</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium">
                    <Code2 className="h-4 w-4" />
                    <span>Code</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Repository content */}
              <div className="border border-gray-300 rounded-md overflow-hidden">
                {/* Files header */}
                <div className="bg-gray-100 border-b border-gray-300 p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold">1,337 commits</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-600" />
                    <input 
                      type="text" 
                      placeholder="Find a file..." 
                      className="bg-white rounded-md px-3 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Files list */}
                <div className="divide-y divide-gray-200">
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <Folder className="h-4 w-4 text-blue-500 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">packages</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Update packages for 18.3.0 release</a>
                    <span className="text-gray-500 text-sm ml-2">2 days ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <Folder className="h-4 w-4 text-blue-500 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">scripts</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Fix release script</a>
                    <span className="text-gray-500 text-sm ml-2">1 week ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <FileCode className="h-4 w-4 text-gray-600 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">.eslintignore</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Update ESLint configuration</a>
                    <span className="text-gray-500 text-sm ml-2">3 weeks ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <FileCode className="h-4 w-4 text-gray-600 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">.gitignore</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Ignore build artifacts</a>
                    <span className="text-gray-500 text-sm ml-2">2 months ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <FileCode className="h-4 w-4 text-gray-600 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">LICENSE</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Update license year</a>
                    <span className="text-gray-500 text-sm ml-2">6 months ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <FileCode className="h-4 w-4 text-gray-600 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">README.md</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Update documentation for v18</a>
                    <span className="text-gray-500 text-sm ml-2">1 month ago</span>
                  </div>
                  <div className="flex items-center py-2 px-3 hover:bg-gray-50">
                    <FileCode className="h-4 w-4 text-gray-600 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline flex-grow">package.json</a>
                    <a href="#" className="text-gray-600 text-sm hover:text-blue-600">Bump version to 18.3.0</a>
                    <span className="text-gray-500 text-sm ml-2">2 days ago</span>
                  </div>
                </div>
              </div>

              {/* README preview */}
              <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">
                <div className="bg-gray-100 border-b border-gray-300 p-3 flex items-center">
                  <BookOpen className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">README.md</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="prose max-w-none">
                    <h1>React</h1>
                    <p>React is a JavaScript library for building user interfaces.</p>
                    <ul>
                      <li><strong>Declarative:</strong> React makes it painless to create interactive UIs.</li>
                      <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state.</li>
                      <li><strong>Learn Once, Write Anywhere:</strong> Develop new features without rewriting existing code.</li>
                    </ul>
                    <h2>Installation</h2>
                    <p>React has been designed for gradual adoption from the start, and you can use as little or as much React as you need:</p>
                    <pre className="bg-gray-100 p-3 rounded-md overflow-auto">
                      <code>npm install react react-dom</code>
                    </pre>
                    <h2>Documentation</h2>
                    <p>You can find the React documentation on the website.</p>
                    <h2>Examples</h2>
                    <p>We have several examples on the website. Here is the first one to get you started:</p>
                    <pre className="bg-gray-100 p-3 rounded-md overflow-auto">
                      <code>{`import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'code' && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab
                </h3>
                <p className="text-gray-600">
                  This tab is not implemented in this demo.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <div className="flex items-center mb-4 md:mb-0">
              <Github className="h-6 w-6 mr-2" />
              <span>© 2025 GitHub, Inc.</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Terms</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Privacy</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Security</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Status</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Docs</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Contact GitHub</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Pricing</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">API</a>
              <a href="#" className="hover:text-blue-600 mb-2 md:mb-0">Training</a>
              <a href="#" className="hover:text-blue-600">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;