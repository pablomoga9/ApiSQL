const express = require('express');
const checkApiKey = require('../middlewares/auth_API_KEY')
// Rutas de productos
const authorsApiController = require("../controllers/authorsApiControllers");
const authorsApiRouter = express.Router();


authorsApiRouter.get('/authors',authorsApiController.getAuthors)
authorsApiRouter.post('/authors', authorsApiController.createAuthor)
authorsApiRouter.put('/authors', authorsApiController.updateAuthor)
authorsApiRouter.delete('/authors',authorsApiController.deleteAuthor)
authorsApiRouter.post('/authors', authorsApiController.createAuthorsTable)
authorsApiRouter.delete('/authors',authorsApiController.deleteAuthorsTable)

module.exports = authorsApiRouter;