const { Attendance, Employee, User } = require("../models");
const { verifyToken } = require("../utils/jwt");

//MULAI ATTENDANCE ROUTE

const getAttendance = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Access token missing" });
    }

    // Extract the token from the Authorization header:
    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid token" });
        }

        // **Attach the decoded user information to the request object for further use:**
        req.user = decoded;

        // Proceed with the protected route logic:
        try {
            const attendance = await Attendance.findAll({
                include: [{ model: Employee }],
                order: [["attendanceId", "ASC"]],
            });
            res.json(attendance);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } catch (error) {
        console.error("Error verifying token:", error.message);
        res.status(500).json({
            message: error.message,
        }); // Avoid leaking details
    }
};

// const getAttendance = async (req, res) => {
//     try {
//         const attendance = await Attendance.findAll({
//             include: [
//                 {
//                     model: Employee,
//                 },
//             ],
//         });
//         res.json(attendance);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };

const getAttendancePagination = async (req, res) => {
    const { page = 1, dataPerPage = 3 } = req.query;
    const offset = (page - 1) * dataPerPage;

    console.log(page, dataPerPage, offset);
    try {
        const totalRows = await Attendance.count(); // Count total rows
        const pages = Math.ceil(totalRows / dataPerPage); // Calculate total pages

        const attendance = await Attendance.findAll({
            limit: dataPerPage, // Limit the number of results
            offset, // Skip results based on the current page
            include: [
                {
                    model: Employee,
                },
            ],
            order: [["attendanceId", "ASC"]],
        });

        res.json({
            items: attendance,
            totalRows,
            pages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Handle errors gracefully
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findByPk(req.params.id, {
            include: [
                {
                    model: Employee,
                },
            ],
        });
        res.json(attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const createAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.json(attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const updateAttendance = async (req, res) => {
    const id = req.params.id;
    let data = req.body;
    try {
        const status = await Attendance.update(data, {
            where: { attendanceId: id },
        });

        if (!status) return res.status(404).send({ message: "not found" });

        return res.status(200).send({ message: "update succesful" });
    } catch (e) {
        return res
            .status(500)
            .send({ message: "something happen when updating", error: e });
    }
};

const deleteAttendance = async (req, res) => {
    const id = req.params.id;
    try {
        const status = await Attendance.destroy({
            where: { attendanceId: id },
        });

        if (!status) return res.status(404).send({ message: "not found" });

        return res.status(200).send({ message: "delete successful" });
    } catch (e) {
        return res
            .status(500)
            .send({ message: "something happen when deleting", error: e });
    }
};

module.exports = {
    getAttendance,
    getAttendancePagination,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
};
