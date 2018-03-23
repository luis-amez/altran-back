const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');

router.get('/', authController.isUser, apiController.default);
router.get('/clients', apiController.clients);
router.get('/user-by-id/:id', authController.isUser, apiController.userById);
router.get('/users-by-name/:name', authController.isUser, apiController.usersByName);
router.get('/policies-by-name/:name', authController.isAdmin, apiController.policiesByUserName);
router.get('/user-by-policy-id/:id', authController.isAdmin, apiController.userByPolicyId);

module.exports = router;
