const mongoose = require('mongoose');

console.log('Loading Blog.js'); // Debug log

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String },
  media: [{
    url: String,
    public_id: String,
    resource_type: String // "image" or "video"
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);