const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(20)
        .regex(/^[^\s]+$/)
        .error(
            new Error(
                "Username must be at least 4 characters long and should not contain spaces."
            )
        ),

    password: Joi.string()
        .required()
        .min(6)
        .error(new Error("Password must be at least 6 characters long.")),
});

module.exports = {
    validateSignUp: (data) => userSchema.validate(data),
};
