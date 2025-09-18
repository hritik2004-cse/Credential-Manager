import React, { useState } from 'react';
import { FiLink, FiUsers, FiPlus, FiUser, FiGithub } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import Links from './Components/Links';
import SocialMedia from './Components/SocialMedia';
import myImage from './assets/my-img.jpg';

function App() {
  const [activeTab, setActiveTab] = useState('links');

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="relative z-10 border-b border-slate-800/30 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                <FiLink className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Link Manager
                </h2>
                <p className="text-xs text-slate-500">Professional Link Organization</p>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700/50">
                <img 
                  src={myImage} 
                  alt="Hritik Sharma" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-white">Hritik Sharma</p>
                  <p className="text-xs text-slate-400">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <nav className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-3 shadow-2xl">
              <div className="flex space-x-3">
                <button 
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform ${
                    activeTab === 'links' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105 shadow-blue-500/25' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 hover:scale-102'
                  }`}
                  onClick={() => setActiveTab('links')}
                >
                  <FiLink className="w-5 h-5" />
                  <span className="text-sm md:text-base">Website Links</span>
                  {activeTab === 'links' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </button>
                <button 
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform ${
                    activeTab === 'social' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105 shadow-purple-500/25' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 hover:scale-102'
                  }`}
                  onClick={() => setActiveTab('social')}
                >
                  <FiUsers className="w-5 h-5" />
                  <span className="text-sm md:text-base">Social Media</span>
                  {activeTab === 'social' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-8 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'links' && <Links />}
          {activeTab === 'social' && <SocialMedia />}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 backdrop-blur-xl bg-slate-950/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <FiLink className="w-10 h-10 text-white" />
              </div>
              <HiSparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Link Manager Pro
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6">
              Organize, manage, and access your digital world with professional elegance
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <span>Built with</span>
              <span className="text-red-400">♥</span>
              <span>by Hritik Sharma</span>
            </div>
            <div className="mt-4 text-xs text-slate-600">
              © 2025 Link Manager Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
