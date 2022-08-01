const express = require('express');
const checkApiKey = require('../middlewares/auth_API_KEY')
// Rutas de productos
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRouter = express.Router();

entriesApiRouter.get('/',entriesApiController.getEntries)
entriesApiRouter.post('/', entriesApiController.createEntry)

module.exports = entriesApiRouter;
//GET http//:localhost:3000/entries --> ALL
//GET http://localhost:3000/entries?email=hola@gmail.com -->por email
//POST http://localhost:3000/entries