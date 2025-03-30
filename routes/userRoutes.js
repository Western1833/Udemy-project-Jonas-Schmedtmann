const express = require('express');

const userController = require('../controlers/userController.js');
const authController = require('../controlers/authController.js');

const router = express.Router();

router.post('/signup', authController.signup);

router.route('/')
.get(userController.getAllUsers)
.post(userController.createuser);

router.route('/:id')
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;