const { Router } = require('express');
const { deleteAttendee} = require('../controller/antendeeController.js');
const { verifyToken  } = require('../middleware/authentication.js');
const router = Router();


router.delete('/:attendeeId', verifyToken, deleteAttendee);

module.exports = router;
