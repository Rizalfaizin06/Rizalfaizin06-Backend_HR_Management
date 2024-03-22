const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20)
        .alphanum()
        .error(
            new Error(
                "Username must be a valid alphanumeric string (3-20 characters)"
            )
        ),
    password: Joi.string()
        .required()
        .min(6)
        .error(new Error("Password must be at least 6 characters long")),
});

module.exports = {
    validateSignUp: (data) => userSchema.validate(data),
};
