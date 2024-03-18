const express = require("express");
const {
    getAttendance,
    getAttendancePagination,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
} = require("../controller/attendance.controller");
const router = express.Router();

router.get("/attendances", getAttendance);
router.get("/attendances/pagination", getAttendancePagination);
router.get("/attendances/:id", getAttendanceById);
router.post("/attendances/", createAttendance);
router.put("/attendances/:id", updateAttendance);
router.delete("/attendances/:id", deleteAttendance);

module.exports = router;
