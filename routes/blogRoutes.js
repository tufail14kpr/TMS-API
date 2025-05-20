const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const storage = require('../config/storage');

// Configure multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Routes
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', upload.array('media', 5), blogController.createBlog); // Upload up to 5 media files
router.put('/:slug', upload.array('media', 5), blogController.updateBlog); // Upload up to 5 media files
router.delete('/:slug', blogController.deleteBlog);

module.exports = router;