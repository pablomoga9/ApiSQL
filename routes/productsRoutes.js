const express = require('express');

// Rutas de productos
const productsController = require("../controllers/productsController");
const productsRouter = express.Router();

// /products
productsRouter.get('/:id?',productsController.getProducts);


module.exports = productsRouter;