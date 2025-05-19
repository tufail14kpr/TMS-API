const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TMS API',
      version: '1.0.0',
      description: 'API documentation for the TMS Blog application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (JSDoc comments in route files)
};

const specs = swaggerJsdoc(options);

module.exports = specs;