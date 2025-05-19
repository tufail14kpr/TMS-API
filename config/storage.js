const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'blogs',
    resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
    public_id: Date.now() + '-' + file.originalname.split('.')[0]
  })
});

module.exports = multer({ storage: storage });
