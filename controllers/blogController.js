const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// Helper function to generate a slug from the title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, author, content } = req.body;

    // Generate slug from title
    let slug = generateSlug(title);
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
    }

    // Process uploaded media
    const media = req.files ? req.files.map(file => ({
      url: file.path, // Cloudinary URL
      public_id: file.filename, // Cloudinary public ID
      resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
    })) : [];

    const newBlog = new Blog({
      title,
      slug,
      author: author || 'Anonymous',
      content,
      media,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Update fields
    if (title) {
      blog.title = title;
      blog.slug = generateSlug(title);
    }
    if (author) blog.author = author;
    if (content) blog.content = content;

    // Delete old media from Cloudinary if new media is uploaded
    if (req.files && req.files.length > 0) {
      if (blog.media && blog.media.length > 0) {
        for (const item of blog.media) {
          await cloudinary.uploader.destroy(item.public_id);
        }
      }
      blog.media = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      }));
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete media from Cloudinary
    if (blog.media && blog.media.length > 0) {
      for (const item of blog.media) {
        await cloudinary.uploader.destroy(item.public_id);
      }
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};