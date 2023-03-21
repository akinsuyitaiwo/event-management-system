const Joi = require('joi');

// const options = {
//     stripUnknown: true,
//     abortEarly: false,
//     errors: {
//         wrap: {
//             label: ''
//         }
//     }
// };

exports.validateEventData = (event) => {
    const newEvent = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        date: Joi.string().required(),
        location: Joi.string().min(4).max(36).required(),
        description: Joi.string().min(4).max(1000).required(),
    })

    return newEvent.validate(event);
}

exports.validateEventDataUpdate = (events) => {
    const newEvent = Joi.object({
        date: Joi.string().required(),
        location: Joi.string().min(4).max(36).required(),
    })

    return newEvent.validate(events);
}