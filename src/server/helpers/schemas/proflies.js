const Joi = require("@hapi/joi");

const LoginValidation = data => {
    const Schema = {
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(5)
    };
    return Joi.validate(data, Schema);
};


module.exports.LoginValidation = LoginValidation;