const { Router } = require('express');
const user = require('./user');
const event = require('./event');
const attendee = require('./attendee');
const router = Router();

router.use('/users', user);
router.use('/events', event);
router.use('/attendee', attendee);

module.exports = router;


