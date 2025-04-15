const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { verifyToken } = require('../auth/firebaseAdmin');

router.get('/data', verifyToken, dataController.getData);

module.exports = router;
