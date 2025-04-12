const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const factory = require('./handlerFactory.js');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync (async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400))
    }
    console.log("req.body: ", req.body)
    
    const filterBody = filterObj(req.body, 'name', 'email');
    console.log('Filtered body:', filterBody);
    
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});
    
    res.status(200).json({
        status: 'success',
        data: null
    })
});

exports.createUser = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

exports.getAllUsers = factory.getAll(User);
exports.getSingleUser = factory.getOne(User, null, 'user');

//Do Not update passwords with this!
exports.updateUser = factory.updateOne(User, 'user');

//For admin only! Deletes the user from DB, not just make it inactive!
exports.deleteUser = factory.deleteOne(User, 'user');