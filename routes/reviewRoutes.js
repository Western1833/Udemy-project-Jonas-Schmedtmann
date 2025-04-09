const express = require('express');
const reviewController = require('../controlers/reviewController.js');
const authController = require('../controlers/authController.js');

const router = express.Router({mergeParams: true});

router.route('/').get(reviewController.getAllReviews)
.post(authController.protect, authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createNewReview);

router.route('/:id').get(authController.protect, reviewController.getSingleReview)
.patch(reviewController.updateReview)
.delete(reviewController.deleteReview);

module.exports = router;