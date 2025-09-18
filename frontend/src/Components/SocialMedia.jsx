import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiPlus, FiEdit2, FiTrash2, FiCopy, FiExternalLink, FiUsers,
  FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube
} from 'react-icons/fi';
import { 
  SiDiscord, SiTiktok, SiTwitch, SiFacebook 
} from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi';

const SocialMedia = () => {
  const [socials, setSocials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  const [formData, setFormData] = useState({
    platform: '',
    username: '',
    url: ''
  });

  const API_URL = 'http://localhost:5000/api';

  // Popular social media platforms with React Icons
  const platforms = [
    { name: 'GitHub', icon: FiGithub, baseUrl: 'https://github.com/', color: 'text-gray-400' },
    { name: 'LinkedIn', icon: FiLinkedin, baseUrl: 'https://linkedin.com/in/', color: 'text-blue-500' },
    { name: 'Twitter', icon: FiTwitter, baseUrl: 'https://twitter.com/', color: 'text-blue-400' },
    { name: 'Instagram', icon: FiInstagram, baseUrl: 'https://instagram.com/', color: 'text-pink-500' },
    { name: 'Facebook', icon: SiFacebook, baseUrl: 'https://facebook.com/', color: 'text-blue-600' },
    { name: 'YouTube', icon: FiYoutube, baseUrl: 'https://youtube.com/@', color: 'text-red-500' },
    { name: 'TikTok', icon: SiTiktok, baseUrl: 'https://tiktok.com/@', color: 'text-pink-400' },
    { name: 'Discord', icon: SiDiscord, baseUrl: 'https://discord.com/users/', color: 'text-indigo-500' },
    { name: 'Twitch', icon: SiTwitch, baseUrl: 'https://twitch.tv/', color: 'text-purple-500' },
  ];

  // Fetch social media links
  const fetchSocials = async () => {
    try {
      const response = await axios.get(`${API_URL}/social`);
      setSocials(response.data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSocial) {
        await axios.put(`${API_URL}/social/${editingSocial._id}`, formData);
      } else {
        await axios.post(`${API_URL}/social`, formData);
      }
      fetchSocials();
      resetForm();
    } catch (error) {
      console.error('Error saving social link:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ platform: '', username: '', url: '' });
    setIsModalOpen(false);
    setEditingSocial(null);
  };

  // Handle edit
  const handleEdit = (social) => {
    setFormData(social);
    setEditingSocial(social);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this social media link?')) {
      try {
        await axios.delete(`${API_URL}/social/${id}`);
        fetchSocials();
      } catch (error) {
        console.error('Error deleting social link:', error);
      }
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async (url, event) => {
    try {
      await navigator.clipboard.writeText(url);
      const button = event.target.closest('button');
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Copied!</span>';
      button.classList.add('bg-green-500/20', 'border-green-500/30');
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-500/20', 'border-green-500/30');
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  // Get platform info
  const getPlatformInfo = (platformName) => {
    return platforms.find(p => p.name.toLowerCase() === platformName.toLowerCase()) || 
           { icon: FiUsers, color: 'text-slate-400' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <FiUsers className="text-purple-400" />
            Social Media Links
          </h2>
          <p className="text-slate-400 mt-1">Manage and share your social media profiles</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FiPlus className="w-5 h-5" />
          Add Social Link
        </button>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials.map((social, index) => {
          const platformInfo = getPlatformInfo(social.platform);
          const IconComponent = platformInfo.icon;
          
          return (
            <div 
              key={social._id} 
              className="group bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-3 rounded-xl bg-slate-700/50 ${platformInfo.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {social.platform}
                    </h3>
                    <p className="text-purple-400 font-medium text-sm">
                      @{social.username}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(social)}
                    className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(social._id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => copyToClipboard(social.url, e)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-purple-500/20 border border-slate-600/50 hover:border-purple-500/30 py-3 px-4 rounded-xl font-medium transition-all duration-300 group"
                >
                  <FiCopy className="w-4 h-4 group-hover:text-purple-400" />
                  <span className="group-hover:text-purple-400">Copy</span>
                </button>
                <button 
                  onClick={() => window.open(social.url, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-400/50 py-3 px-4 rounded-xl font-medium transition-all duration-300 group"
                >
                  <FiExternalLink className="w-4 h-4 group-hover:text-purple-400" />
                  <span className="group-hover:text-purple-400">Open</span>
                </button>
              </div>
            </div>
          );
        })}
        
        {socials.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 max-w-md">
              <FiUsers className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No social links saved yet</h3>
              <p className="text-slate-500 mb-6">Add your social media profiles to easily share them with others</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 mx-auto"
              >
                <FiPlus className="w-4 h-4" />
                Add Your First Social Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <HiSparkles className="text-purple-400" />
                {editingSocial ? 'Edit Social Link' : 'Add Social Media Link'}
              </h3>
              <button 
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-slate-800 text-slate-400">Select Platform</option>
                  {platforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <option key={platform.name} value={platform.name} className="bg-slate-800 text-white py-2">
                        {platform.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="e.g., yourusername"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="e.g., https://github.com/yourusername"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 py-3 px-4 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {editingSocial ? 'Update' : 'Add'} Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
