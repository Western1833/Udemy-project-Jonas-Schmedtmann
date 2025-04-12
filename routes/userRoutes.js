const express = require('express');

const userController = require('../controlers/userController.js');
const authController = require('../controlers/authController.js');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect)

router.route('/me').get(userController.getMe, userController.getSingleUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/')
.get(userController.getAllUsers);

router.route('/:id')
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;