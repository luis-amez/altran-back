const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');

// 'ok' response
router.get('/', authController.isUser, apiController.default);
router.get('/clients', apiController.clients);

module.exports = router;
