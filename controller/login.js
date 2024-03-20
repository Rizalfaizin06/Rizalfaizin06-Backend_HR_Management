const { Attendance, Employee, User } = require("../models");

const login = async (req, res) => {
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

module.exports = login;
