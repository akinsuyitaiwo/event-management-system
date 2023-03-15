const { Router } = require('express');
const {createUser, signinUser} = require('../controller/userController.js');
const router = Router();

router.post('/signup', createUser);
router.post('/signin', signinUser);

module.exports = router;
