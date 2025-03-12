const express = require('express');

const developerController = require('../controller/developer-controller');

const router = express.Router();

router.post('/add',developerController.addDeveloper);
router.delete('/delete/:id',developerController.deleteDeveloper);
module.exports = router;