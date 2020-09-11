const Joi = require("@hapi/joi");
const { schema } = require("../../models/schemas/user");

const signInValidation = data => {
    const Schema = {
        name: Joi.string().required().min(5),
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(5)
    }
    return Joi.validate(data, Schema);   
};

module.exports.signInValidation = signInValidation;