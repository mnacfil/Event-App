const express = require('express');
const moment = require('moment');
const router = express.Router();

// middleware
const { authenticateUser } = require('../middleware/authentication')

// controllers
const {
    getAllEvent,
    getSingeEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../conrollers/event')

router.post('/create-event', [authenticateUser, createEvent]);
router.get('/', [authenticateUser, getAllEvent]);
router.route('/:id').
    patch([authenticateUser, updateEvent]).
    get([authenticateUser, getSingeEvent]).
    delete([authenticateUser, deleteEvent])

module.exports = router;