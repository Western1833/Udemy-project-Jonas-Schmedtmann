const Tour = require('../models/tourModel.js');
const APIfeatures = require('../utils/apiFeatures.js');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIfeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const allTours = await features.query;

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

exports.getTourStats = async (req, res) => {
    try{
        const stats = await Tour.aggregate([
            {
                $match: {ratingsAverage: {$gte: 4.5}}
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: {$sum: 1},
                    numRatings: {$sum: '$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
            },
            {
                $sort: {avgPrice: 1}
            },
            // {
            //     $match: {_id: {$ne: 'easy'}}
            // }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
}