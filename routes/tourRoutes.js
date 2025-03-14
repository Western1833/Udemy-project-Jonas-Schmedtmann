const express = require('express');

const tourController = require('../controlers/tourController.js');

const router = express.Router();

router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

router.route('/:id')
.get(tourController.getSingleTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;