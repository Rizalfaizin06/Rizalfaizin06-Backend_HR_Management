const express = require("express");
const parser = require("body-parser");
const app = express();
const port = 4000;
const cors = require("cors");

const employeeRouter = require("./routes/employee.routes");
const attendanceRouter = require("./routes/attendance.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use("/", employeeRouter);
app.use("/", attendanceRouter);
app.use("/", authRouter);
app.use("/", userRouter);
