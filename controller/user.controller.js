const { Attendance, Employee, User } = require("../models");
const { validateDeleteUser } = require("../validation/deleteUser.validation"); // Assuming validation.js is in the same directory

const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const validationResult = validateDeleteUser(username);

    if (validationResult.error) {
        return res
            .status(400)
            .send({ message: validationResult.error.message });
    }

    try {
        const status = await User.destroy({ where: { username: username } });

        if (!status) return res.status(404).send({ message: "not found" });
        return res.status(200).send({ message: "delete successful" });
    } catch (e) {
        return res
            .status(500)
            .send({ message: "something happen when deleting", error: e });
    }
};

module.exports = {
    deleteUser,
    getUser,
};
