const express = require('express');

const userController = require('../controlers/userController.js');
const authController = require('../controlers/authController.js');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/')
.get(userController.getAllUsers)

router.route('/:id')
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;