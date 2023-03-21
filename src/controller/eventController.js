const models = require('../models/index.js');
const { validateEventData, validateEventDataUpdate } = require('../utils/validations/eventValidation.js');

exports.createEvent = async(req,res) => {
    try {
        const { _id } = req.user;
        const valid = validateEventData(req.body);
        if(valid.error) {
            res.status(400).send(valid.error.message);
        }
        const { name, date, location, description } = req.body;
        const user = await models.User.findById({_id});
        if (!user){
            res.status(404).send('User does not exist');
        }
        const eventDetails = await models.Event.create({
            owner: _id,
            name,
            date,
            location,
            description
        });
        res.status(201).send({
            message : 'Event created successfully',
            data :eventDetails});
    } catch (error) {
       return res.status(500).send(error.message);
    }
}

exports.viewEventById = async (req, res) => {
    try {
        const { _id } = req.user;
        const { eventId } = req.params;
        const user = await models.User.findById({_id});
        if (!user){
            res.status(404).send('User does not exist');
        }
        const event = await models.Event.findById({ _id: eventId });
        if (event.length < 1) {
            res.status(404).send('Event not found');
        }
        if(event.status === 'pending') {
            return res.status(400).send('Event awaiting admin approval')
        } else if (event.status === 'rejected') {
            return res.status(400).send('Event rejected by admin')
        }
        const attendeeCount = await models.Attendee.count({ event: eventId});
        const eventDetails = {
            owner: event.owner,
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            status: event.status,
            attendee: attendeeCount
        }
        res.status(200).send({
            message: 'Event details fetched successfully',
            data: eventDetails
        });
    } catch (error) {
       return res.status(500).send(error.message);
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { _id } = req.user;
        const { eventId } = req.params;
        const valid = validateEventDataUpdate(req.body);
        if(valid.error) {
           return res.status(400).send(valid.error.message);
        }
        const { date, location } = req.body;
        const user = await models.User.findById({ _id });
        if (!user) {
           return res.status(404).send('User does not exist');
        }
        const event = await models.Event.findById({ _id: eventId });
        if (event.owner === !(user._id)) {
           return res.status(404).send('Event not found');
        }
        if(event.status === 'pending') {
            return res.status(400).send('Event awaiting admin approval')
        }else if(event.status === 'rejected') {
            return res.status(400).send('Event rejected by admin')
        }
        const eventDetails = await models.Event.findByIdAndUpdate({ _id: eventId }, {
            date, location
        }).select('-comment');
        res.status(201).send({
            message : 'Event created successfully',
            data :eventDetails});
    } catch (error) {
       return res.status(500).send(error.message);
    }
}
