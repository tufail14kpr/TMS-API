const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');
require('dotenv').config();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TMS API',
      version: '1.0.0',
      description: 'API documentation for the TMS Blog application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (JSDoc comments in route files)
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tmsdb',
)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Health check route (optional, but good for devops)
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Blog routes
app.use('/api/blogs', blogRoutes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});