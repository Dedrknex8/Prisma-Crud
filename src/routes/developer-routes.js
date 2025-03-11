const express = require('express');

const developerController = require('../controller/developer-controller');

const router = express.Router();

router.post('/add',developerController.addDeveloper);

module.exports = router;