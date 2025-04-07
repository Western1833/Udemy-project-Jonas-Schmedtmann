const Review = require('../models/reviewModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const allReviews = await Review.find();

    res.status(200).json({
        status: 'success',
        results: allReviews.length,
        data: {
            allReviews
        }
    });
});

exports.createNewReview = catchAsync(async (req, res, next) => {
    const review = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            review
        }
    });
});

exports.getSingleReview = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const review = await Review.findById(id);

    if(!review){
        return next(new AppError('Invalid ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});