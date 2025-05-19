const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/storage'); // multer config

// Multiple files: fields = [{ name: 'media', maxCount: 5 }]
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', upload.array('media', 5), blogController.createBlog);      // Upload up to 5 media files
router.put('/:slug', upload.array('media', 5), blogController.updateBlog);  // Edit & replace media
router.delete('/:slug', blogController.deleteBlog);

module.exports = router;
