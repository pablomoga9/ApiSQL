const express = require('express');
const checkApiKey = require('../middlewares/auth_API_KEY')
// Rutas de productos
const authorsApiController = require("../controllers/authorsApiControllers");
const authorsApiRouter = express.Router();


authorsApiRouter.get('/',authorsApiController.getAuthors)
authorsApiRouter.post('/', authorsApiController.createAuthor)
authorsApiRouter.put('/', authorsApiController.updateAuthor)
authorsApiRouter.delete('/',authorsApiController.deleteAuthor)
authorsApiRouter.post('/', authorsApiController.createAuthorsTable)
authorsApiRouter.delete('/',authorsApiController.deleteAuthorsTable)

module.exports = authorsApiRouter;