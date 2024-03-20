// //MULAI ATTENDANCE ROUTE
// const getAbsen = async (req, res) => {
//     try {
//         const attendance = await Attendance.findAll();
//         res.json(attendance);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };
const { AttendanceAll } = require("../services/absen.service");

//MULAI ATTENDANCE ROUTE
const getAbsen = async (req, res) => {
    try {
        const attendance = await AttendanceAll();
        res.status(200).json(attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// async function AttendanceAll() {
//     return await attendance.findAll();
// }

// //file lain
// async function AttendanceAll() {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return true;
// }

// //MULAI ATTENDANCE ROUTE
// const getAbsen = async (req, res) => {
//     const { username, password } = req.body;

//     const attendance = await AttendanceAll();
//     if (attendance == false && username != "rizal") {
//         return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//     }

//     if (password != "123") {
//         return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//     }

//     return res.json({ message: "Login success" });
// };

module.exports = {
    getAbsen,
    // AttendanceAll,
};
