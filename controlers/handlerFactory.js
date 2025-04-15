const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const APIfeatures = require('../utils/apiFeatures.js');

exports.deleteOne = (Model, whatIsDeleted) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    
    if(!doc) {
        return next(new AppError(`There is no ${whatIsDeleted} with that ID!`, 404));
    }
    
    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateOne = (Model, whatIsUpdated) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!doc){
        return next(new AppError(`There is no ${whatIsUpdated} with that ID!`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            [whatIsUpdated]: doc
        }
    });
});

exports.createOne = (Model, whatIsCreated) => catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            [whatIsCreated]: newDoc
        }
    });
});

exports.getOne = (Model, populateOptions, whatIsObtained) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if(populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if(!doc) {
       return next(new AppError(`There is no ${whatIsObtained} with that ID!`, 404));
    }

    res.status(200).json({
        status: 'success',
        [whatIsObtained]: doc
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    //To allow for nested GET reviews on tour
    let filter = {};
    if(req.params.tourId) filter = {tour: req.params.tourId};

    const features = new APIfeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});