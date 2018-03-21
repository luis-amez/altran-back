var express = require('express');
var router = express.Router();

// 'ok' response
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'ok' });
});

module.exports = router;
