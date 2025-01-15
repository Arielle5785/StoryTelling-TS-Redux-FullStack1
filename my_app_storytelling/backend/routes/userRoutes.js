const express = require('express');
const { register, login, refreshAccessToken  } = require('../controllers/userController_1');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);

module.exports = router;
