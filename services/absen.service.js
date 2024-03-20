const { Attendance, Employee, User } = require("../models");

async function AttendanceAll() {
    return await [
        {
            id: 1,
            name: "JRIXALLLL",
            date: "2024-03-19",
            status: "present",
        },
        {
            id: 2,
            name: "RIXAWLL",
            date: "2024-03-19",
            status: "absent",
        },
    ];
}

module.exports = {
    AttendanceAll,
};
