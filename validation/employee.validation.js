const Joi = require("joi");

const userSchema = Joi.object({
    avatar: Joi.string().allow(null, ""),
    name: Joi.string().required().min(3).max(20),
    departement: Joi.string().required().min(3).max(20),
    position: Joi.string().required().min(3).max(20),
    domicile: Joi.string().allow(null, ""),
    email: Joi.string().email().required(),
    status: Joi.boolean().required(),
});

const idSchema = Joi.number().integer().min(0).max(999999999).required();

module.exports = {
    validateEmployee: (data) => userSchema.validate(data),
    validateEmployeeId: (data) => idSchema.validate(data),
};
