const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const userModel = require('../models/userModel.js');
const sendEmail = require('../utils/mail.js');
const { sign } = jwt;


exports.createUser = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        if(!req.body) {
            res.status(400).send({
                message: "content cannot be empty"
            });
        }
        const existingUser = await User.findOne({email});
            if(existingUser){
                    return res.status(201).send({message:'this user already exists'});
                }
            const hashedPassword = await hash(password, 10);
            const nameSplit = name.split(' ');
            const user = new User({
                firstName: nameSplit[0],
                lastName: nameSplit[1],
                email: email,
                password: hashedPassword
            });
            await user.save();
            const message = `Dear ${name}, thank you for siginig up to this event service`
            const subject = 'registration message'
            await sendEmail(email,subject,message);
            res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.signinUser = async( req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(201).send({message:'This email is not registered'});
        }
        const incorrectPass = await compare(user.password, password)
        if(incorrectPass) {
            res.status(401).send('password mismatch');
        }
        const { _id} = user;
        const JWT_KEY = process.env.JWT_SECRET;
        const token = sign({_id, email}, JWT_KEY);
        const userDetails = {
            _id,
            email,
            firstName: user.firstName,
            lastName: user.lastName,
         }
         res.status(201).send({userDetails, token});
    } catch (error) {
        throw error
    }
}