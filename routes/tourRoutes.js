const express = require('express');

const tourController = require('../controlers/tourController.js');
const authController = require('../controlers/authController.js');
const reviewController = require('../controlers/reviewController.js');

const router = express.Router();

// router.param('id', tourController.checkId);
router.route('/top-5').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/')
.get(authController.protect, tourController.getAllTours)
.post(tourController.createTour);

router.route('/:id')
.get(tourController.getSingleTour)
.patch(tourController.updateTour)
.delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('user'), reviewController.createNewReview)

module.exports = router;