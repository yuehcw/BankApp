const express = require('express');
const { register, login, deposit, withdraw, balance } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);
router.get('/balance', auth, balance);

module.exports = router;
