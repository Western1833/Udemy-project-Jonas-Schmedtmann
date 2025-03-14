const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');


const port = 5050;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

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

const userRouter = express.Router();

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