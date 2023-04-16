const express = require('express');
const router = express.Router();
const { userAuth, adminAuth }  = require('../controllers/auth');
const { signup, login, editProfile } = require('../controllers/userControllers');

router.post('/signup', signup)
router.post('/login', login)
router.post('/editProfile', userAuth, editProfile);

module.exports = router;