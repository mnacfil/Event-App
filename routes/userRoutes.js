const express = require('express');
const router = express.Router();

// Controllers
const { register, login, getAllUser, deleteUser} = require('../conrollers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUser);
router.delete('/:id', deleteUser)

module.exports = router;