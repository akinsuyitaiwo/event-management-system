const { Router } = require('express');
const {createUser} = require('../controller/userController');
const router = Router();

router.post('/signup', createUser)

module.exports = router;
