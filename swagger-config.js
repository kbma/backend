// swagger-config.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Node.js avec Swagger',
      version: '1.0.0',
      description: 'Documentation de l\'API avec Swagger',
    },
  },
  apis: ['./Routes/*.js'], // Spécifiez le chemin vers vos fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
