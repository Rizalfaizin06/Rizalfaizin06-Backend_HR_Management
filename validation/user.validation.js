// const Joi = require("joi");

// const userSchema = Joi.object({
//     username: Joi.string()
//         .required()
//         .trim()
//         .min(4)
//         .max(20)
//         .regex(/^[^\s]+$/)
//         .error(
//             new Error(
//                 "Username must be at least 4 characters long and should not contain spaces."
//             )
//         ),

//     password: Joi.string()
//         .required()
//         .min(6)
//         .error(new Error("Password must be at least 6 characters long.")),
// });

// const usernameSchema = Joi.string()
//     .required()
//     .trim()
//     .min(4)
//     .max(20)
//     .regex(/^[^\s]+$/)
//     .error(
//         new Error(
//             "Username must be at least 4 characters long and should not contain spaces."
//         )
//     );

// module.exports = {
//     validateUser: (data) => userSchema.validate(data),
//     validateUsername: (data) => usernameSchema.validate(data),
// };

const Joi = require("joi");

const createValidator = (schema) => (data) => schema.validate(data);

const usernameSchema = Joi.string()
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

const passwordSchema = Joi.string()
    .required()
    .min(6)
    .error(new Error("Password must be at least 6 characters long."));

const validateUser = createValidator(
    Joi.object({
        username: usernameSchema,
        password: passwordSchema,
    })
);

const validateUsername = createValidator(usernameSchema);

module.exports = {
    validateUser,
    validateUsername,
};
