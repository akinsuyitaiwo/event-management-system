const { Router } = require('express');
const {createEvent, viewEventById} = require('../controller/eventController');
const verifyToken = require('../middleware/auth');
const router = Router();

router.post('/newEvent', verifyToken, createEvent);
router.get('/:eventId', verifyToken, viewEventById);

module.exports = router;
