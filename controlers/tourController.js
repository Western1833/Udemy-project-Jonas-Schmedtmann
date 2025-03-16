const Tour = require('../models/tourModel.js');

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price!'
        });
    }

    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.getSingleTour = (req, res) => {
    const id = Number(req.params.id);

};

exports.createTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};