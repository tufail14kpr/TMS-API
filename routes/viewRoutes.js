const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Debug: Log the viewController to check its contents
console.log('viewController:', viewController);

// Route to render the homepage
router.get('/home', viewController.renderHome);

// Route to render a single blog page
router.get('/blogs/:slug', viewController.renderBlog);

module.exports = router;