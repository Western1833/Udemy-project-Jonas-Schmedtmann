const express = require('express');

const userController = require('../controlers/userController.js');

const router = express.Router();

router.route('/')
.get(userController.getAllUsers)
.post(userController.createuser);

router.route('/:id')
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;