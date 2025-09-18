import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from main project directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linkmanager')
  .then(() => console.log('📊 MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Link Schema
const linkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
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

// Routes

// Get all links
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new link
app.post('/api/links', async (req, res) => {
  try {
    const link = new Link(req.body);
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update link
app.put('/api/links/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete link
app.delete('/api/links/:id', async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all social media links
app.get('/api/social', async (req, res) => {
  try {
    const socials = await Social.find().sort({ createdAt: -1 });
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new social media link
app.post('/api/social', async (req, res) => {
  try {
    const social = new Social(req.body);
    const savedSocial = await social.save();
    res.status(201).json(savedSocial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update social media link
app.put('/api/social/:id', async (req, res) => {
  try {
    const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(social);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete social media link
app.delete('/api/social/:id', async (req, res) => {
  try {
    await Social.findByIdAndDelete(req.params.id);
    res.json({ message: 'Social media link deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
