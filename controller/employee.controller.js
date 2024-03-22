const { Attendance, Employee, User } = require("../models");
// const { query, validationResult } = require("express-validator");
const { validationResult } = require("express-validator");

// MULAI EMPLOYEE ROUTE
const getEmployee = async (req, res) => {
    const employee = await Employee.findAll();
    res.json(employee);
};

const getEmployeeById = async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    res.json(employee);
};

// const createEmployee = async (req, res) => {
//     try {
//         const employee = await Employee.create(req.body);
//         res.json(employee);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.message });
//     }
// };

const createEmployee = async (req, res) => {
    // const { error } = req.validationErrors(); // Access validation errors
    // console.log(req.validationErrors());
    // if (error) {
    //     // Handle validation errors
    //     return res.status(400).json({ errors: error.array() });
    // }
    try {
        const employee = await Employee.create(req.body);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
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
