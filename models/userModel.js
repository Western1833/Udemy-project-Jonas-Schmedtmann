const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minLength: 4,
        select: false
    },
    passwordChangedAt: {
        type: Date
    }
});

userSchema.virtual('passwordConfirm')
.set(function(value){
    this._passwordConfirm = value;
})
.get(function(){
    return this._passwordConfirm;
});

userSchema.pre('validate', function(next){
    if (!this._passwordConfirm) {
        this.invalidate('passwordConfirm', 'Please confirm your password.');
    }

    if(this.password !== this._passwordConfirm){
        this.invalidate('passwordConfirm', 'Passwords do not match!');
    }

    next();
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (!this.passwordChangedAt) return false;

    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);

    return JWTTimestamp < changedTimestamp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;