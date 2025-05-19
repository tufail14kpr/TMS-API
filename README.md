TMS Blog
TMS Blog is a modern blogging platform built with Node.js, Express, and MongoDB. It allows users to create, read, update, and delete blog posts with support for rich media (images and videos) using Cloudinary for storage. The frontend is rendered with EJS and styled with Tailwind CSS for a sleek, responsive design. The project includes both a user-facing web interface and a REST API with Swagger documentation.
Features

Blog Management: Create, read, update, and delete blog posts with titles, slugs, content, authors, and media.
Media Support: Upload images and videos using Cloudinary integration.
Modern UI: Responsive design with EJS templates and Tailwind CSS.
REST API: Fully documented API endpoints using Swagger UI.
Error Handling: User-friendly error pages for 404 and 500 errors.
MongoDB Integration: Stores blog data in a MongoDB database.

Tech Stack

Backend: Node.js, Express
Frontend: EJS, Tailwind CSS
Database: MongoDB (via Mongoose)
Media Storage: Cloudinary
API Documentation: Swagger UI
CSS Processing: PostCSS, Autoprefixer, cssnano

Project Structure
tms-blog/
├── config/
│   ├── cloudinary.js       # Cloudinary configuration
│   ├── storage.js          # Multer configuration for file uploads
│   └── swagger.yaml        # Swagger API documentation
├── controllers/
│   ├── blogController.js   # API controllers for blog operations
│   └── viewController.js   # Controllers for rendering views
├── models/
│   └── Blog.js             # Mongoose schema for Blog
├── public/
│   ├── css/
│   │   ├── styles.css      # Tailwind CSS input file
│   │   └── output.css      # Compiled Tailwind CSS
├── routes/
│   ├── blogRoutes.js       # API routes for /api/blogs
│   └── viewRoutes.js       # Routes for rendering views
├── views/
│   ├── home.ejs            # Homepage template
│   ├── blog.ejs            # Blog detail page template
│   └── error.ejs           # Error page template
├── app.js                  # Main Express application
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project documentation

Prerequisites

Node.js: v22.12.0 or later
MongoDB: A running MongoDB instance (local or cloud)
Cloudinary Account: For media storage (images and videos)

Installation

Clone the Repository:
git clone https://github.com/tufail14kpr/TMS-API.git
cd tms-blog


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the project root and add the following:
PORT=3000
MONGO_URI= add your mongo db uri
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret


Replace MONGO_URI with your MongoDB connection string.
Replace the Cloudinary credentials with your own (get them from your Cloudinary dashboard).


Build Tailwind CSS:
npm run build:css

This generates public/css/output.css from public/css/styles.css.


Usage

Start the Development Server:
npm run dev

This uses nodemon to watch for changes and restart the server automatically.

Watch for CSS Changes (Development):In a separate terminal, run:
npm run watch:css

This rebuilds the CSS whenever styles.css or tailwind.config.js changes.

Access the Application:

Homepage: http://localhost:3000/home
API Docs: http://localhost:3000/api-docs
Create Blog: http://localhost:3000/create (requires implementation)


Build for Production:To generate an optimized CSS file for production:
npm run prod:css

Then start the server:
npm start



API Endpoints
The REST API is available at /api/blogs. Use Swagger UI (http://localhost:3000/api-docs) to explore and test the endpoints. Key endpoints include:

GET /api/blogs: Get all blogs
GET /api/blogs/:slug: Get a blog by slug
POST /api/blogs: Create a new blog (supports up to 5 media files)
PUT /api/blogs/:slug: Update a blog (optionally replace media)
DELETE /api/blogs/:slug: Delete a blog (also removes media from Cloudinary)

Screenshots
(You can add screenshots of your homepage, blog page, and error page here. Use GitHub's image hosting or an external service like Imgur.)
Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

Built with ❤️ by [Your Name]
Thanks to the creators of Express, Tailwind CSS, MongoDB, and Cloudinary for their amazing tools.

Contact
For questions or feedback, reach out at your-email@example.com.
