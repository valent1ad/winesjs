const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'WinesJS API', // API Title
        version: '1.0.0', // API version
        description: 'API Documentation for WinesJS', // Short description
        contact: {
            name: "Valentin",
            url: "https://github.com/valent1ad/winesjs",
        }
    },
    servers: [
        {
            url: 'http://localhost:3000', // Change this to the base URL of your API
            description: 'Development server'
        }
    ]
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs (you may need to change this path)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example route
app.get('/', (req, res) => {
    res.send('WinesJS API running');
});

// Define API routes
// e.g. app.use('/wines', winesRouter);

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
