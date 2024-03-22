const { Attendance, Employee, User } = require("../models");
const { validateUsername } = require("../validation/user.validation");
const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const username = req.params.username;
    const validationResult = validateUsername(username);
    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.message });
    }

    try {
        const status = await User.destroy({ where: { username: username } });

        if (!status) return res.status(404).json({ message: "not found" });
        return res.status(200).json({ message: "delete successful" });
    } catch (error) {
        return res.status(500).json({
            message: "something happen when deleting",
            error: error.message,
        });
    }
};

module.exports = {
    deleteUser,
    getUser,
};
