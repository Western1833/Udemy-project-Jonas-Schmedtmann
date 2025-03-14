const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
    console.log(`Tour id: ${val}`);
    if(Number(req.params.id > tours.length)){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    next();
}

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
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.getSingleTour = (req, res) => {
    const id = Number(req.params.id);

    const tour = tours.find(el => el.id === id);

    if(!tour){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    };

    res.status(200).json({
        status: 'sucess',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(204).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
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