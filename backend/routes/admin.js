const express = require('express');
const router = express.Router();
const { login, getUsers, deleteUser, editUser, createUser, getUser } = require('../controllers/adminController');
const { adminAuth } = require('../controllers/auth');

router.post('/login', login);
router.get('/home', adminAuth, getUsers);
router.delete('/deleteUser', adminAuth, deleteUser);
router.get('/getUser',adminAuth, getUser)
router.post('/editUser', adminAuth, editUser);
router.post('/createUser', adminAuth, createUser);

module.exports = router;