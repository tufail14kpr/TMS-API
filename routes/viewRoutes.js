const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Homepage
router.get('/home', viewController.renderHome);

// Blog detail page
router.get('/blogs/:slug', viewController.renderBlog);

// Create blog page
router.get('/create', viewController.renderCreate);

// Handle create blog form submission
router.post('/create', viewController.createBlog);

module.exports = router;