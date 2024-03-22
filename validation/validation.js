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
});

module.exports = {
    validateUsername: (username) => userSchema.validate({ username }),
};
