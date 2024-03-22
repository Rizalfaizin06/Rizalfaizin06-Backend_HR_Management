const { Attendance, Employee, User } = require("../models");
const {
    validateEmployee,
    validateEmployeeId,
} = require("../validation/employee.validation");

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findAll();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    const id = req.params.id;

    const { error } = validateEmployeeId(id);
    // console.log(id);
    // console.log(error);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const employee = await Employee.findByPk(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEmployee = async (req, res) => {
    const data = req.body;

    const { error } = validateEmployee(data);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "something happen when creating",
        });
    }
};

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const { error } = validateEmployeeId(id);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const status = await Employee.update(data, {
            where: { employeeId: id },
        });

        if (!status) return res.status(404).send({ message: "not found" });

        return res.status(200).send({ message: "update succesful" });
    } catch (e) {
        return res.status(500).json({
            message: "something happen when deleting",
            error: error.message,
        });
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
