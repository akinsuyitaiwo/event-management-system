const { Router } = require('express');
const user = require('./user');
const router = Router();

router.use('/users', user);

module.exports = router;


