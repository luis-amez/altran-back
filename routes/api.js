const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

// 'ok' response
router.get('/', apiController.default);
router.get('/clients', apiController.clients);

module.exports = router;
