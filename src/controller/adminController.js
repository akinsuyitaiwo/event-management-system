const models = require('../models/index.js');
const sendEmail = require('../utils/mail.js');

exports.approveEvent = async (req, res) => {
    try {
        const { _id } = req.user;
        const {eventId} = req.params;
        const user = await models.User.findById({ _id});
        if(!user){
            return res.status(404).send('user not found');
        }
        if(user.role !== 'admin') {
            return res.status(400).send('access denied');
        }
        const event = await models.Event.findById({ _id: eventId });
        if(!event) {
            return res.status(404).send('event not found');
        }
        const eventDetails = await models.Event.findByIdAndUpdate({ _id: eventId}, {status: 'approved'}).select('-comment');
        return res.status(200).send({
            message: 'event approved',
            data: eventDetails
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.rejectEvent = async (req, res) => {
    try {
        const { _id } = req.user;
        const {eventId} = req.params;
        const { comment} = req.body;
        const user = await models.User.findById({ _id});
        if(!user){
            return res.status(404).send('user not found');
        }
        if(user.role !== 'admin') {
            return res.status(400).send('access denied');
        }
        const event = await models.Event.findById({ _id: eventId });
        if(!event) {
            return res.status(404).send('event not found');
        }
        const eventOwner = await models.User.findById({_id: event.owner})
        const {email} = eventOwner
        const eventDetails = await models.Event.findByIdAndUpdate({ _id: eventId}, {status: 'rejected'}).select('-comment');
        const subject = 'Event Notification'
        const message = comment
        await sendEmail(email, subject, message)
        return res.status(200).send({
            message: 'event rejected',
            data: eventDetails
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
exports.deleteEvent = async (req, res) => {
    try {
        const { _id } = req.user;
        const {eventId} = req.params;
        const user = await models.User.findById({ _id});
        if(!user){
            return res.status(404).send('user not found');
        }
        if(user.role !== 'admin') {
            return res.status(400).send('access denied');
        }
        const event = await models.Event.findById({ _id: eventId });
        if(!event) {
            return res.status(404).send('event not found');
        }
        await models.Event.findByIdAndDelete({ _id: eventId} );
        return res.status(200).send({
            message: 'event deleted'
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
exports.getAttendees = async (req, res) => {
    try {
        const { _id } = req.user;
        const {eventId} = req.params;
        const user = await models.User.findById({ _id});
        if(!user){
            return res.status(404).send('user not found');
        }
        if(user.role !== 'admin') {
            return res.status(400).send('access denied');
        }
        const event = await models.Event.findById({ _id: eventId });
        if(!event) {
            return res.status(404).send('event not found');
        }
        const attendeeCount = await models.Attendee.find({ event: eventId});
        if(attendeeCount < 1){
            return res.status(404).send('No attendee found');
        }
        return res.status(200).send({
            message: 'attendee fetched successfully',
            data: attendeeCount
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}