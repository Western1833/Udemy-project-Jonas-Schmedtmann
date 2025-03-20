const Tour = require('../models/tourModel.js');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludedOptions = ['page', 'sort', 'limit', 'fields'];

        excludedOptions.forEach(el => delete queryObj[el]);

        //filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = Tour.find(JSON.parse(queryStr));

        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(req.query.sort);
            //sort descending order with ?sort=-
            //sort by two criterias, we separete with comma
        }else{
            query = query.sort('-createdAt');
        }

        //field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error('The page does not exist!');
        }

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