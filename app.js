const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const viewRoutes = require('./routes/viewRoutes'); // Import the new view routes
const cors = require('cors');
require('dotenv').config();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

// Load the Swagger YAML file
const swaggerFile = fs.readFileSync('./config/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Mount view routes
app.use('/', viewRoutes);

// Blog API routes
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
  console.log(`Homepage available at http://localhost:${PORT}/home`);
});