const Event = require('../models/Event');

const createEvent = async (req, res) => {
    req.body.user = req.user.userId;
    const event = await Event.create(req.body);
    res.status(201).json({event});
}

const getAllEvent = async (req, res) => {
    const events = await Event.find({}).populate({
        path: 'user',
        select: 'username email'
    });
    res.status(200).json({events, count: events.length});
}

const getSingeEvent = async (req, res) => {
    const event = await Event.findOne({_id : req.params.id}).populate({
        path: 'user',
        select: 'username email'
    });

    if(!event) {
        throw new Error('No event found in resources')
    }
    res.status(200).json({event});
}

const updateEvent = async (req, res) => {
    const {title, start, end, users} = req.body
    const event = await Event.findOne({_id : req.params.id})

    if(!event) {
        throw new Error('No event found in resources')
    }

    event.title = title;
    event.start = start,
    event.end = end;
    event.users = users

    await event.save();

    res.status(200).json({msg: "Updated Succesfully", event});
}

const deleteEvent = async (req, res) => {
    const event = await Event.findOneAndRemove({_id : req.params.id})
    if(!event) {
        throw new Error('No event found in resources')
    }
    res.status(200).json({msg: "Deleted Succesfully"});
}

module.exports = {
    getAllEvent,
    getSingeEvent,
    createEvent,
    updateEvent,
    deleteEvent
}