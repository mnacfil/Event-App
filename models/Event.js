const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: [true, 'Start time is required']
    },
    end: {
        type: Date,
        required: [true, 'End time is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: {
        type: Array,
        min: [1, 'Must be at least 1'],
        required: true
    }
}, {timeStamp: true})

module.exports = mongoose.model('Event', eventSchema);