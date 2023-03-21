const { Router } = require('express');
const user = require('./userRoutes.js');
const event = require('./eventRoutes.js');
const attendee = require('./attendeeRoutes.js');
const admin = require('./adminRoutes');
const router = Router();

router.use('/users', user);
router.use('/events', event);
router.use('/attendee', attendee);
router.use('/admin', admin);

module.exports = router;


