const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { hash, compare } = require('bcrypt');
const models = require('../models/index.js');
const sendEmail = require('../utils/mail.js');
const { validateSignUpData, validateLoginData } = require('../utils/validations/userValidation.js');
const { sign } = jwt;

dotenv.config();

exports.createUser = async (req,res) => {
    try {
        const valid = validateSignUpData(req.body);
        if (valid.error) {
            return res.status(400).send(valid.error.message);
        }
        const {name, email, password} = req.body;
        const User = await models.User.findOne({email});
        if(User){
            return res.status(400).send({message:'this user already exists'});
        }
        const hashedPassword = await hash(password, 10);
        const nameSplit = name.split(' ');
        const user = new models.User({
            firstName: nameSplit[0],
            lastName: nameSplit[1],
            email: email,
            password: hashedPassword
        });
        await user.save();
        const message = ` Hi ${nameSplit[0]}, Thank you for siginig up to TEMS, Welcome on board.`
        const subject = 'Registration Mail'
        await sendEmail(email,subject,message);
        return res.status(201).send({
            message : 'Account created successfully',
            data : user
        });
    } catch (error) {
     return res.status(500).send(error.message);
    }
}

exports.signinUser = async( req, res) => {
    try {
        const valid = validateLoginData(req.body);
        if (valid.error) {
            return res.status(400).send(valid.error.message);
        }
        const { email, password } = req.body;
        const user = await models.User.findOne({ email });
        if (!user){
            return res.status(400).send({
                message:'This email is not registered'
            });
        }
        const incorrectPass = await compare(password, user.password)
        if (!incorrectPass) {
            return res.status(401).send('password mismatch');
        }
        const { _id} = user;
        const JWT_KEY = process.env.JWT_SECRET;
        const token = sign({ _id, email }, JWT_KEY);
        const userDetails = {
            _id,
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
        return res.status(200).send({
            message : 'user logged in successfully',
            data: {userDetails,
            token}
    });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}