const { Router } = require('express');
const {createEvent, viewEventById} = require('../controller/eventcontroller.js');
const verifyToken = require('../middleware/auth.js');
const router = Router();

router.post('/newEvent', verifyToken, createEvent);
router.get('/:eventId', verifyToken, viewEventById);

module.exports = router;
