const { Router } = require('express');
const {addAttendee, deleteAttendee} = require('../controller/antendeecontroller.js');
const verifyToken = require('../middleware/auth.js');
const router = Router();

router.post('/:eventId', addAttendee);
router.delete('/delete/:attendeeId', verifyToken, deleteAttendee);

module.exports = router;
