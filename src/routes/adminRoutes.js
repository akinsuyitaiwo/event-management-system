const { Router } = require('express');
const { approveEvent, rejectEvent, deleteEvent, getAttendees} = require('../controller/adminController.js');
const { verifyToken, verifyAdmin } = require('../middleware/authentication.js');
const router = Router();

router.patch('/:eventId/approve', verifyToken, verifyAdmin, approveEvent);
router.patch('/:eventId/reject', verifyToken, verifyAdmin, rejectEvent);

router.get('/:eventId', verifyToken, verifyAdmin, getAttendees);


router.delete('/:eventId', verifyToken, verifyAdmin, deleteEvent);
module.exports = router;