const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./tourModel.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already in use!'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email.']
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minLength: 4
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        minLength: 4
    }
});

const User = mongoose.Model('User', userSchema);

module.exports = User;