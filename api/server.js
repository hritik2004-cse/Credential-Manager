const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://credentialmanager-3r8nhetgr-hritik-sharma-s-projects.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://linkmanager:CAMTSdLIsD1WCPxT@cluster0.lxbww.mongodb.net/credentialmanager?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Link Schema
const linkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Social Media Schema
const socialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  username: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Link = mongoose.model('Link', linkSchema);
const Social = mongoose.model('Social', socialSchema);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Links routes
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/links', async (req, res) => {
  try {
    const link = new Link(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/links/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json(link);
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/links/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: error.message });
  }
});

// Social media routes
app.get('/api/social', async (req, res) => {
  try {
    const social = await Social.find().sort({ createdAt: -1 });
    res.json(social);
  } catch (error) {
    console.error('Error fetching social links:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/social', async (req, res) => {
  try {
    const social = new Social(req.body);
    await social.save();
    res.status(201).json(social);
  } catch (error) {
    console.error('Error creating social link:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/social/:id', async (req, res) => {
  try {
    const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!social) return res.status(404).json({ error: 'Social media entry not found' });
    res.json(social);
  } catch (error) {
    console.error('Error updating social link:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/social/:id', async (req, res) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social) return res.status(404).json({ error: 'Social media entry not found' });
    res.json({ message: 'Social media entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting social link:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
