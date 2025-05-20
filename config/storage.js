const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tms-blog-media', // Store media in a folder named 'tms-blog-media'
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov'], // Allow images and videos
  },
});

module.exports = storage;