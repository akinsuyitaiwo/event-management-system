const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hash } = require('bcrypt');
const userModel = require('../models/userModel');


exports.createUser = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        if(!req.body) {
            res.status(400).send({
                message: "content cannot be empty"
            });
            const existingUser = await userModel.findOne()
                if(existingUser){
                    return res.staus(201).send({message:'this user already exists'})
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
            await sendEmail({
                email: user.email,
                subject: 'registration message',
                message
            });
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
