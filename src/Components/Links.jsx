import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiLink, FiGlobe } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: ''
  });

  const API_URL = 'http://localhost:5000/api';

  // Fetch links
  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_URL}/links`);
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLink) {
        await axios.put(`${API_URL}/links/${editingLink._id}`, formData);
      } else {
        await axios.post(`${API_URL}/links`, formData);
      }
      fetchLinks();
      resetForm();
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', description: '', url: '' });
    setIsModalOpen(false);
    setEditingLink(null);
  };

  // Handle edit
  const handleEdit = (link) => {
    setFormData(link);
    setEditingLink(link);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await axios.delete(`${API_URL}/links/${id}`);
        fetchLinks();
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  // Open link in new tab
  const openLink = (url) => {
    // Add https:// if not present
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <FiGlobe className="text-blue-400" />
            Website Links
          </h2>
          <p className="text-slate-400 mt-1">Manage your favorite websites and resources</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FiPlus className="w-5 h-5" />
          Add Link
        </button>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <div 
            key={link._id} 
            className="group bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {link.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={() => handleEdit(link)}
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                  title="Edit"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(link._id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => openLink(link.url)}
              className="w-full flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-slate-600/50 hover:border-blue-500/30 py-3 px-4 rounded-xl font-medium transition-all duration-300 group"
            >
              <FiExternalLink className="w-4 h-4 group-hover:text-blue-400" />
              <span className="group-hover:text-blue-400">Open Link</span>
            </button>
          </div>
        ))}
        
        {links.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 max-w-md">
              <FiLink className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No links saved yet</h3>
              <p className="text-slate-500 mb-6">Add your first link to get started organizing your favorite websites</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 mx-auto"
              >
                <FiPlus className="w-4 h-4" />
                Add Your First Link
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
                <HiSparkles className="text-yellow-400" />
                {editingLink ? 'Edit Link' : 'Add New Link'}
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
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Google"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="e.g., Search engine"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="e.g., https://google.com"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {editingLink ? 'Update' : 'Add'} Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
