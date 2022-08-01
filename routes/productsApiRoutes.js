const express = require('express');
const checkApiKey = require('../middlewares/auth_API_KEY')
// Rutas de productos
const productsApiController = require("../controllers/productsApiController");
const productsApiRouter = express.Router();

// /products
productsApiRouter.get('/:id?',productsApiController.getProducts);
productsApiRouter.post('/',checkApiKey, productsApiController.createProduct);
productsApiRouter.delete('/',checkApiKey, productsApiController.deleteProduct)

module.exports = productsApiRouter;