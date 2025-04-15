const express = require('express');
const router = express.Router();
const whiteLabelController = require('../controllers/whiteLabelController');

router.post('/create', whiteLabelController.createWhiteLabel);

module.exports = router;

    