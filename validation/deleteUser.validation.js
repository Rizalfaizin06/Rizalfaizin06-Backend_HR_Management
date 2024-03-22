const Joi = require("joi");

const userSchema = Joi.string()
    .required()
    .trim()
    .min(4)
    .max(20)
    .regex(/^[^\s]+$/)
    .error(new Error("Username atleast 4 and not contain space"));

module.exports = {
    validateDeleteUser: (data) => userSchema.validate(data),
};
