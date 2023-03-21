const { Router } = require('express');
const { createEvent, viewEventById, updateEvent } = require('../controller/eventController.js');
const { addAttendee} = require('../controller/antendeeController.js')
const { verifyToken} = require('../middleware/authentication.js');
const router = Router();

router.post('/new', verifyToken, createEvent);
router.post('/:eventId/attendee',verifyToken, addAttendee);

router.get('/:eventId', verifyToken, viewEventById);

router.patch('/:eventId', verifyToken, updateEvent );

module.exports = router;
