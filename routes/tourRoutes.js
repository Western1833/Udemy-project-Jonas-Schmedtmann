const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getSingleTour = (req, res) => {
    const id = Number(req.params.id);

    const tour = tours.find(el = el.id === id);

    if(!tour){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    };
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req,body);

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

const updateTour = (req, res) => {
    if(Number(req.params.id > tours.length)){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...'
        }
    });
};

const deleteTour = (req, res) => {
    if(Number(req.params.id > tours.length)){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

router.route('/')
.get(getAllTours)
.post(createTour);

router.route('/:id')
.get(getSingleTour)
.patch(updateTour)
.delete(deleteTour);

module.exports = router;