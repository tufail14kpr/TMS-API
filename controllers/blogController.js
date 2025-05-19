const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// CREATE Blog with image/video upload
exports.createBlog = async (req, res) => {
  try {
    const { title, slug, content, author } = req.body;
    let media = [];
    if (req.files) {
      media = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image'
      }));
    }
    const blog = new Blog({ title, slug, content, author, media });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE Blog and (optionally) replace media
exports.updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, author } = req.body;
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // If new files uploaded, delete old media from Cloudinary
    if (req.files && req.files.length) {
      // Delete previous media
      for (const item of blog.media) {
        await cloudinary.uploader.destroy(item.public_id, { resource_type: item.resource_type });
      }
      // Set new media
      blog.media = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image'
      }));
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (author) blog.author = author;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Blog and remove media from Cloudinary
exports.deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Delete media from Cloudinary
    for (const item of blog.media) {
      await cloudinary.uploader.destroy(item.public_id, { resource_type: item.resource_type });
    }

    res.json({ message: 'Blog and media deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      // Render an error page or redirect instead of sending JSON
      return res.status(404).render('error', { message: 'Blog not found' });
    }
    res.render('blog', { blog });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};