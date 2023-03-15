const { Router } = require('express');
const {addAttendee, deleteAttendee} = require('../controller/antendeecontroller');
const verifyToken = require('../middleware/auth');
const router = Router();

router.post('/:eventId', addAttendee);
router.delete('/delete/:attendeeId', verifyToken, deleteAttendee);

module.exports = router;
