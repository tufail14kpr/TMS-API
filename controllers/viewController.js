const Blog = require('../models/Blog');
const multer = require('multer');
const storage = require('../config/storage');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Multer setup for file uploads (up to 5 files)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
}).array('media', 5); // Allow up to 5 files

// Helper function to generate a slug from the title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
};

// Render homepage
exports.renderHome = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('home', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Render blog detail page
exports.renderBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).render('error', { message: 'Blog not found' });
    }
    res.render('blog', { blog });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Render create blog page
exports.renderCreate = (req, res) => {
  res.render('create');
};

// Handle create blog form submission
exports.createBlog = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).render('error', { message: 'Error uploading media' });
    }

    try {
      const { title, author, content } = req.body;

      // Generate slug from title
      const slug = generateSlug(title);

      // Check if slug already exists
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog) {
        // If slug exists, append a timestamp to make it unique
        const timestamp = Date.now();
        slug = `${slug}-${timestamp}`;
      }

      // Process uploaded media
      const media = req.files ? req.files.map(file => ({
        url: file.path, // Cloudinary URL
        public_id: file.filename, // Cloudinary public ID
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      })) : [];

      // Create new blog
      const newBlog = new Blog({
        title,
        slug,
        author: author || 'Anonymous',
        content,
        media,
      });

      await newBlog.save();
      res.redirect(`/blogs/${slug}`);
    } catch (err) {
      console.error('Error creating blog:', err);
      res.status(500).render('error', { message: 'Internal Server Error' });
    }
  });
};