const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');

router.get('/user-by-id/:id', authController.isUser, apiController.userById);
router.get('/user-by-name/:name', authController.isUser, apiController.userByName);
router.get('/policies-by-user-name/:name', authController.isAdmin, apiController.policiesByUserName);
router.get('/user-by-policy-id/:id', authController.isAdmin, apiController.userByPolicyId);

module.exports = router;
