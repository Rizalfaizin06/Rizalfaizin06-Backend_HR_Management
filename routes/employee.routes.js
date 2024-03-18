const express = require("express");
const {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require("../controller/employee.controller");
const router = express.Router();

router.get("/employees", getEmployee);
router.get("/employees/:id", getEmployeeById);
router.post("/employees/", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
