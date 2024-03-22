const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { Attendance, Employee, User } = require("../models");
const { generateToken } = require("../utils/jwt");
const { validateSignUp } = require("../validation/signUp.validation");

const signIn = async (req, res) => {
    const { username, password } = req.body;

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

    res.json({ token });
};

const signUp = async (req, res) => {
    const { username, password } = req.body;
    const validationResult = validateSignUp({
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

    const user = await User.create({
        username,
        password: hashedPassword,
    });

    const token = generateToken(user);

    res.json({ token });
};

module.exports = {
    signIn,
    signUp,
};
