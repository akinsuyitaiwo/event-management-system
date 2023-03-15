const Event = require('../models/eventsModel');
const User = require('../models/userModel');
const Attendee = require('../models/attendees')

exports.createEvent = async(req,res) => {
    try {
        const { _id } = req.user;
        const { name, date, location, description } = req.body;
        const user = await User.findById({_id});
        if(!user){
            res.status(404).send('User does not exist');
        }
        const eventDetails = await Event.create({
            owner: _id,
            name,
            date,
            location,
            description
        });
        res.status(201).send(eventDetails)
    } catch (error) {
        res.status(500).send('The error is from our end and we are trying hard to solve it')
    }
}

exports.viewEventById = async (req, res) =>{
    try {
        const { eventId } = req.params;
        const event = await Event.findById({ _id: eventId });
        if (event.length < 1) {
            res.status(404).send('Event not found');
        }
        const attendeeCount = await Attendee.count({ event: eventId});
        const eventDetails = {
            owner: event.owner,
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            attendee: attendeeCount
        }
        res.status(200).send({
            message: 'Event details fetched successfully',
            data: eventDetails
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}