const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


const port = 5050;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const app = express();

app.use(morgan('dev'));
app.use(express.json());

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

const getAllUsers = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

const createuser = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

const getSingleUser = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        stratus: 'error',
        message: 'This route is not yet defined!'
    });
}

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/')
.get(getAllTours)
.post(createTour);

tourRouter.route('/:id')
.get(getSingleTour)
.patch(updateTour)
.delete(deleteTour);

userRouter.route('/')
.get(getAllUsers)
.post(createuser);

app.route('/:id')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));