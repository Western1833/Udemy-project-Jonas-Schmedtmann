const Tour = require('../models/tourModel.js');

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludedOptions = ['page', 'sort', 'limit', 'fields'];

        excludedOptions.forEach(el => delete queryObj[el]);

        const query = Tour.find(queryObj);

        const allTours = await query;

        res.status(200).json({
            status: 'success',
            results: allTours.length,
            data: {
                allTours
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};

exports.getSingleTour = async (req, res) => {    
    try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {tour}
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createTour = async (req, res) => {

    try {
        const newTour = await Tour.create(req.body)

        res.status(204).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateTour = async (req, res) => {
    try{
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                updatedTour
            }
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null,
            deletedTourName: req.body.name
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
};