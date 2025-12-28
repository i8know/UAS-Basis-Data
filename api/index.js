const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose.connect('mongodb://mongo:27017/db_kampus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB - db_kampus'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ========== SCHEMA POSTS ==========
const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  views: Number,
  likes: Number,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { collection: 'posts' });

const Posts = mongoose.model('posts', postsSchema);

// ========== ROUTES POSTS ==========
app.get('/api/posts', async (req, res) => {
  console.log('📥 GET /api/posts');
  try {
    const posts = await Posts.find();
    console.log('Found ${posts.length} posts');
    res.json(posts);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post tidak ditemukan' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  const post = new Posts(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ========== ROOT ENDPOINT ==========
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API Anime Paradise berjalan!',
    database: 'db_kampus',
    endpoints: {
      posts: 'GET /api/posts'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'API endpoints available',
    routes: {
      posts: '/api/posts'
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ${PORT}');
  console.log('Database: db_kampus');
  console.log('Endpoints:');
  console.log(`   - GET http://localhost:${PORT}/api/posts`);
});