const AppError = require('../utils/appError.js');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}, please use another value!`;
    return new AppError(message, 400);
}

const errorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const errorProd = (err, res) => {
    if(err.isOperationsl){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else{
        console.error('Error: ', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        errorDev(err, res);
    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err};

        if(error.name === 'CastError') error = handleCastErrorDB(error);
        if(error.code = 11000) error = handleDuplicateFieldsDB(error);

        errorProd(error, res);
    }
}