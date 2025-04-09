const Review = require('../models/reviewModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const factory = require('./handlerFactory.js');

exports.setTourUserIds = (req, res, next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getSingleReview = factory.getOne(Review, null, 'review');

exports.getAllReviews = factory.getAll(Review);

exports.createNewReview = factory.createOne(Review, 'review');

exports.updateReview = factory.updateOne(Review, 'review');

exports.deleteReview = factory.deleteOne(Review, 'review');