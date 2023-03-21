const Joi = require('joi');

const options = {
     stripUnknown: true,
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};

exports.validateSignUpData = (signup) => {
    const userSignUp = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    return userSignUp.validate(signup, options);
};

exports.validateLoginData = (login) => {
    const userLogin = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    return userLogin.validate(login, options);
};