const sendEmail = require('../utils/mail.js');
const models = require('../models/index.js');


exports.addAttendee = async (req,res) => {
    try {
        const {eventId} = req.params;
        const { name, email} = req.body;
        const event = await models.Event.findById({ _id: eventId });
        if (event.length < 1) {
            res.status(404).send('Event not found');
        }
        if(event.status === 'pending') {
            return res.status(400).send('Event awaiting admin approval')
        }
        const nameSplit = name.split(' ');
        const eventAttendee = await models.Attendee.create({
            firstName: nameSplit[0],
            lastName: nameSplit[1],
            email,
            event: eventId
        });
        const subject = `Joining ${event.name}`
        const message = `Hi ${eventAttendee.firstName}, Thank you for you interest in this event: ${event.name}`
        await sendEmail(email,subject,message);
        res.status(201).send({
            message: 'You have successfully registered for the event',
            data: eventAttendee
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteAttendee = async (req, res) => {
    try {
        const { attendeeId } = req.params;
        const attendee = await models.Attendee.findById({_id: attendeeId});
        const { email } = attendee
        console.log(attendee);
        const subject = `Remove from ${attendee.event}`
        const message = `Hi ${attendee.firstName}, You have been removed from this event: ${attendee.event}`
        await sendEmail(email,subject,message);
         await models.Attendee.findOneAndDelete(attendeeId);
        res.status(200).send('Attendee deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}