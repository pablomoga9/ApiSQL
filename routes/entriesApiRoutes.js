const express = require('express');
const checkApiKey = require('../middlewares/auth_API_KEY')
// ENTRIES ROUTES
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRouter = express.Router();

//---------------------------------------------------------

entriesApiRouter.get('/entries',entriesApiController.getEntries)
entriesApiRouter.post('/entries', entriesApiController.createEntry)
entriesApiRouter.put('/entries', entriesApiController.updateEntry)
entriesApiRouter.delete('/entries',entriesApiController.deleteEntry)
entriesApiRouter.post('/entries',entriesApiController.createEntriesTable)
entriesApiRouter.delete('/entries',entriesApiController.deleteEntriesTable)

//Export

module.exports = entriesApiRouter;
