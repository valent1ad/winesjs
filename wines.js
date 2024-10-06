const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000; // Choose a port for the server
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

let wines = [];

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wine API',
      version: '1.0.0',
      description: 'A simple API to manage wines',
    },
    components: {
      schemas: {
        Wine: {
          type: 'object',
          required: ['name', 'year', 'grape', 'country', 'price'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated ID of the wine',
            },
            name: {
              type: 'string',
              description: 'The name of the wine',
            },
            year: {
              type: 'integer',
              description: 'The year the wine was produced (4 digits)',
              minimum: 1900,
              maximum: 2100,
            },
            grape: {
              type: 'string',
              description: 'The grape variety of the wine',
            },
            country: {
              type: 'string',
              description: 'The country of origin of the wine',
            },
            price: {
              type: 'string',
              pattern: '^\\d+(\\.\\d{2})?$', // Regular expression for XX.XX format
              description: 'The price of the wine (format: XX.XX)',
            },
          },
          example: {
            id: 1,
            name: 'Merlot',
            year: 2020,
            grape: 'Merlot',
            country: 'France',
            price: '15.99', // Example price
          },
        },
      },
    },
  },
  apis: ['./wines.js'], // Path to your API docs
};

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route to download the Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Route to get the list of wines
/**
 * @swagger
 * /wines:
 *   get:
 *     summary: Returns the list of all wines
 *     tags: [Wines]
 *     responses:
 *       200:
 *         description: The list of wines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wine'
 */
app.get('/wines', (req, res) => {
    res.json(wines);
});

// Route to create a new wine
/**
 * @swagger
 * /wines:
 *   post:
 *     summary: Create a new wine
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wine'
 *     responses:
 *       201:
 *         description: The wine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wine'
 *       400:
 *         description: Bad request
 */
app.post('/wines', (req, res) => {
    const wine = req.body;

    // Validate the year to ensure it's a 4-digit number
    if (wine.year < 1900 || wine.year > 2100) {
        return res.status(400).send('Year must be a 4-digit number between 1900 and 2100.');
    }

    // Validate the price format
    const pricePattern = /^\d+(\.\d{2})?$/; // Matches XX.XX format
    if (!pricePattern.test(wine.price)) {
        return res.status(400).send('Price must be in the format XX.XX.');
    }

    wine.id = wines.length + 1; // Assign a unique ID
    wines.push(wine);
    res.status(201).json(wine);
});

// Route to get a specific wine by ID
/**
 * @swagger
 * /wines/{id}:
 *   get:
 *     summary: Get a wine by ID
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The wine ID
 *     responses:
 *       200:
 *         description: The wine description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wine'
 *       404:
 *         description: Wine not found
 */
app.get('/wines/:id', (req, res) => {
    const wineId = parseInt(req.params.id, 10);
    const wine = wines.find(w => w.id === wineId);
    if (!wine) {
        return res.status(404).send(`Wine ${wineId} doesn't exist`);
    }
    res.json(wine);
});

// Route to delete a wine by ID
/**
 * @swagger
 * /wines/{id}:
 *   delete:
 *     summary: Remove a wine by ID
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The wine ID
 *     responses:
 *       204:
 *         description: The wine was deleted successfully
 *       404:
 *         description: Wine not found
 */
app.delete('/wines/:id', (req, res) => {
    const wineId = parseInt(req.params.id, 10);
    wines = wines.filter(w => w.id !== wineId);
    res.status(204).send(); // No content to return
});

// Start the server
app.listen(port, () => {
    console.log(`Wine API is running at http://localhost:${port}`);
});
