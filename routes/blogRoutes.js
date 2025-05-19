const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/storage'); // multer config

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management API
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve a list of all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The blog ID
 *                   slug:
 *                     type: string
 *                     description: The blog slug
 *                   title:
 *                     type: string
 *                     description: The blog title
 *                   content:
 *                     type: string
 *                     description: The blog content
 *                   media:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs of media files
 *       500:
 *         description: Internal server error
 */
router.get('/', blogController.getAllBlogs);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   get:
 *     summary: Retrieve a blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog slug
 *     responses:
 *       200:
 *         description: A single blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The blog ID
 *                 slug:
 *                   type: string
 *                   description: The blog slug
 *                 title:
 *                   type: string
 *                   description: The blog title
 *                 content:
 *                   type: string
 *                   description: The blog content
 *                 media:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of media files
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get('/:slug', blogController.getBlogBySlug);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The blog title
 *               content:
 *                 type: string
 *                 description: The blog content
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 5 media files (images/videos)
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The blog ID
 *                 slug:
 *                   type: string
 *                   description: The blog slug
 *                 title:
 *                   type: string
 *                   description: The blog title
 *                 content:
 *                   type: string
 *                   description: The blog content
 *                 media:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of uploaded media files
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.array('media', 5), blogController.createBlog);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   put:
 *     summary: Update a blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog slug
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The blog title
 *               content:
 *                 type: string
 *                 description: The blog content
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 5 media files (images/videos) to replace existing media
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The blog ID
 *                 slug:
 *                   type: string
 *                   description: The blog slug
 *                 title:
 *                   type: string
 *                   description: The blog title
 *                 content:
 *                   type: string
 *                   description: The blog content
 *                 media:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of updated media files
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.put('/:slug', upload.array('media', 5), blogController.updateBlog);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   delete:
 *     summary: Delete a blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog slug
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:slug', blogController.deleteBlog);

module.exports = router;