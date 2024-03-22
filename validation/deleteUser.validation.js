const Joi = require("joi");

const userSchema = Joi.string()
    .required()
    .trim()
    .min(4)
    .max(20)
    .regex(/^[^\s]+$/)
    .error(
        new Error(
            "Username must be at least 4 characters long and should not contain spaces."
        )
    );

module.exports = {
    validateDeleteUser: (data) => userSchema.validate(data),
};
