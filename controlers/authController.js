const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
});