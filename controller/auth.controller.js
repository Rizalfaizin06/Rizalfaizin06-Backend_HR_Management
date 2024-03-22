const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { Attendance, Employee, User } = require("../models");
const { generateToken } = require("../utils/jwt");
const { validateUser } = require("../validation/user.validation");

const signIn = async (req, res) => {
    const { username, password } = req.body;
    const validationResult = validateUser({
        username,
        password,
    });

    if (validationResult.error) {
        return res
            .status(400)
            .send({ message: validationResult.error.message });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }
    const token = generateToken(user);

    res.status(200).json({ token });
};

const signUp = async (req, res) => {
    const { username, password } = req.body;
    const validationResult = validateUser({
        username,
        password,
    });

    if (validationResult.error) {
        return res
            .status(400)
            .send({ message: validationResult.error.message });
    }

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    try {
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        const token = generateToken(user);

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({
            message: "something happen when creating",
            error: error.message,
        });
    }
};

module.exports = {
    signIn,
    signUp,
};
