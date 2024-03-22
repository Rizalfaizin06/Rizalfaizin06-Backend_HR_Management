const express = require("express");
// const { body, validationResult } = require("express-validator"); // Import validation functions

const runValidation = require("../validation/validator").runValidation;
const validationAdd = require("../validation/validator").validationAdd;

const {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require("../controller/employee.controller");
const router = express.Router();

// Validation middleware for createEmployee
// const createEmployeeValidator = [
//     body("name")
//         .trim() // Optional: Remove leading/trailing whitespace
//         .notEmpty()
//         .withMessage("Name is required"),
//     body("email").trim().isEmail().withMessage("Invalid email format"),
//     body("department").trim().notEmpty().withMessage("Department is required"),
//     // Add more validation rules as needed
// ];

router.get("/employees", getEmployee);
router.get("/employees/:id", getEmployeeById);
router.post("/employees/", runValidation, validationAdd, createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
