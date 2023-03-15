const { Router } = require('express');
const user = require('./user.js');
const event = require('./event.js');
const attendee = require('./attendee.js');
const router = Router();

router.use('/users', user);
router.use('/events', event);
router.use('/attendee', attendee);

module.exports = router;


