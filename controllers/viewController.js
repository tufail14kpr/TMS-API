const Blog = require('../models/Blog');

// Render the homepage with a list of blogs
exports.renderHome = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetch blogs, sorted by newest first
    res.render('home', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Render a single blog page by slug
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