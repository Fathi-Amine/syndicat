const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: require('../Docs/swagger.json'),
    apis: ['Routes/AuthRoutes.js','Routes/ApartmentRoutes.js','Routes/ClientRoutes','Routes/PaymentRoutes'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;