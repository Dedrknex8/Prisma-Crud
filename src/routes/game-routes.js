const express = require('express');

const gameController = require('../controller/game-controller');

const router = express.Router();

router.post('/add-game',gameController.addGame);
router.get('/get-game',gameController.getallgame);
router.delete('/delete-game/:id',gameController.deleteGame);
router.get('/:id',gameController.findGameById);
module.exports = router;