const express = require('express');

const router = express.Router();

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

router.route('/')
.get(getAllUsers)
.post(createuser);

router.route('/:id')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;