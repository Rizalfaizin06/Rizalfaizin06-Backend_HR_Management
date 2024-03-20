const { Attendance, Employee, User } = require("../models");

// MULAI EMPLOYEE ROUTE
const getEmployee = async (req, res) => {
    const employee = await Employee.findAll();
    res.json(employee);
};

const getEmployeeById = async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    res.json(employee);
};

const createEmployee = async (req, res) => {
    const { username } = req.body;

    const employee = await Employee.findOne({ where: { username } });
    if (!employee) {
        return res.status(201).json({ message: "username already exist" });
    }
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    let data = req.body;
    console.log(id);
    console.log(req.body);
    try {
        const status = await Employee.update(data, {
            where: { employeeId: id },
        });

        if (!status) return res.status(404).send({ message: "not found" });

        return res.status(200).send({ message: "update succesful" });
    } catch (e) {
        return res
            .status(500)
            .send({ message: "something happen when updating", error: e });
    }
};

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const status = await Employee.destroy({ where: { employeeId: id } });

        if (!status) return res.status(404).send({ message: "not found" });

        return res.status(200).send({ message: "delete successful" });
    } catch (e) {
        return res
            .status(500)
            .send({ message: "something happen when deleting", error: e });
    }
};

module.exports = {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
