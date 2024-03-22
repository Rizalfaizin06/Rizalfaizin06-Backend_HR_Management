const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");

describe("Test Get Employee /employees", () => {
    beforeAll(async () => {
        await Employee.destroy({ truncate: true, cascade: true });
    });
    afterEach(async () => {
        jest.restoreAllMocks();
        await Employee.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test.each([
        [0, 0],
        [1, 1],
        // [50, 50],
    ])(
        "should retrieve %i users (create %i users first)",
        async (expectedUsers, numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await Employee.create({
                    avatar: `avatar_url_${i + 1}.jpg`,
                    name: `employee${i + 1}`,
                    departement: `Software Engineer`,
                    position: `Intern`,
                    domicile: `Bandung`,
                    email: `employee${i + 1}@mail.com`,
                    status: true,
                });
            }

            const response = await supertest(app).get("/employees");
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(expectedUsers);
            await Employee.destroy({ truncate: true, cascade: true });
        }
    );

    test("{DB ERROR CHECK} should retrieve 500 internal error", async () => {
        jest.spyOn(Employee, "findAll").mockRejectedValue(
            new Error("Database error")
        );
        const response = await supertest(app).get("/employees");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Database error" });
        jest.restoreAllMocks();
    });
});

describe("Test Get Employee by ID /employees/:id", () => {
    beforeAll(async () => {
        await Employee.destroy({ truncate: true, cascade: true });
    });
    afterEach(async () => {
        jest.restoreAllMocks();
        await Employee.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test.each([
        [0, 0],
        [1, 1],
        // [50, 50],
    ])(
        "should retrieve %i users (create %i users first)",
        async (expectedUsers, numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await Employee.create({
                    employeeId: i + 1,
                    avatar: `avatar_url_${i + 1}.jpg`,
                    name: `employee${i + 1}`,
                    departement: `Software Engineer`,
                    position: `Intern`,
                    domicile: `Bandung`,
                    email: `employee${i + 1}@mail.com`,
                    status: true,
                });
            }

            for (let i = 0; i < numUsersToCreate; i++) {
                const response = await supertest(app).get(
                    `/employees/${i + 1}`
                );
                expect(response.status).toBe(200);

                const expectedKeys = [
                    "employeeId",
                    "avatar",
                    "name",
                    "departement",
                    "position",
                    "domicile",
                    "email",
                    "status",
                    "createdAt",
                    "updatedAt",
                ];

                expectedKeys.forEach((key) =>
                    expect(response.body).toHaveProperty(key)
                );
            }
        }
    );

    test("{DB ERROR CHECK} should retrieve 500 internal error", async () => {
        jest.spyOn(Employee, "findAll").mockRejectedValue(
            new Error("Database error")
        );
        const response = await supertest(app).get("/employees");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Database error" });
        jest.restoreAllMocks();
    });
});

describe("Test Create Employee /employees/ ", () => {
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test("should create a new user with valid credentials", async () => {
        const newUserData = {
            avatar: "avatar_url_1.jpg",
            name: "employee_test",
            departement: "ME-KANIK",
            position: "intern",
            domicile: "Bandung",
            email: "siti.nurhayati@company.com",
            status: false,
        };
        const response = await supertest(app)
            .post("/employees")
            .send(newUserData)
            .expect(201);

        const expectedKeys = [
            "employeeId",
            "avatar",
            "name",
            "departement",
            "position",
            "domicile",
            "email",
            "status",
            "createdAt",
            "updatedAt",
        ];

        expectedKeys.forEach((key) =>
            expect(response.body).toHaveProperty(key)
        );
        await Employee.destroy({ where: { name: "employee_test" } });
    });

    test("should retrieve 400 name validation error", async () => {
        const newUserData = {
            avatar: "avatar_url_1.jpg",
            name: "a",
            departement: "ME-KANIK",
            position: "intern",
            domicile: "Bandung",
            email: "siti.nurhayati@company.com",
            status: false,
        };
        const response = await supertest(app)
            .post("/employees")
            .send(newUserData)
            .expect(400);
        expect(response.body).toEqual({
            message: '"name" length must be at least 3 characters long',
        });
        await Employee.destroy({ where: { name: "a" } });
    });

    test("should retrieve 400 departement validation error", async () => {
        const newUserData = {
            avatar: "avatar_url_1.jpg",
            name: "Rizal Faizin Fidaus",
            departement: "BE",
            position: "intern",
            domicile: "Bandung",
            email: "siti.nurhayati@company.com",
            status: false,
        };
        const response = await supertest(app)
            .post("/employees")
            .send(newUserData)
            .expect(400);
        expect(response.body).toEqual({
            message: '"departement" length must be at least 3 characters long',
        });
        await Employee.destroy({ where: { name: "a" } });
    });

    test("{DB ERROR CHECK} should retrieve 500 internal error", async () => {
        jest.spyOn(Employee, "create").mockRejectedValue(
            new Error("Database error")
        );

        const newUserData = {
            avatar: "avatar_url_1.jpg",
            name: "Rizal Faizin Fidaus",
            departement: "ME-KANIK",
            position: "intern",
            domicile: "Bandung",
            email: "siti.nurhayati@company.com",
            status: false,
        };
        const response = await supertest(app)
            .post("/employees")
            .send(newUserData)
            .expect(500);

        expect(response.body).toEqual({
            error: "Database error",
            message: "something happen when creating",
        });
        jest.restoreAllMocks();
        await User.destroy({ truncate: true, username: "rizal" });
    });
});

describe("Test Update Employee /employees/ ", () => {
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test("should update an existing user with valid credentials", async () => {
        await Employee.create({
            employeeId: 1,
            avatar: `avatar_url_1.jpg`,
            name: `employee1`,
            departement: `Software Engineer`,
            position: `Intern`,
            domicile: `Bandung`,
            email: `employee1@mail.com`,
            status: true,
        });

        const updateData = {
            departement: "MARKETING",
            position: "staff",
        };
        const updateResponse = await supertest(app)
            .put("/employees/1")
            .send(updateData)
            .expect(200);

        expect(updateResponse.body.message).toBe("update succesful");
        await Employee.destroy({ where: { name: "employee1" } });
    });

    test("should retrieve 400 ID validation error", async () => {
        await Employee.create({
            employeeId: 1,
            avatar: `avatar_url_1.jpg`,
            name: `employee1`,
            departement: `Software Engineer`,
            position: `Intern`,
            domicile: `Bandung`,
            email: `employee1@mail.com`,
            status: true,
        });

        const updateData = {
            departement: "MARKETING",
            position: "staff",
        };
        const response = await supertest(app)
            .put("/employees/9999999999999999999")
            .send(updateData)
            .expect(400);
        expect(response.body).toEqual({
            message: '"value" must be a safe number',
        });

        await Employee.destroy({ where: { name: "employee1" } });
    });

    test("should retrieve 404 not found", async () => {
        const response = await supertest(app).delete(`/employees/999999999`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: "not found",
        });
    });

    // test("{DB ERROR CHECK} should retrieve 500 internal error", async () => {
    //     // await Employee.create({
    //     //     employeeId: 1,
    //     //     avatar: `avatar_url_1.jpg`,
    //     //     name: `employee1`,
    //     //     departement: `Software Engineer`,
    //     //     position: `Intern`,
    //     //     domicile: `Bandung`,
    //     //     email: `employee1@mail.com`,
    //     //     status: true,
    //     // });

    //     jest.spyOn(Employee, "update").mockRejectedValue(
    //         new Error("Database error")
    //     );

    //     const updateData = {
    //         departement: "MARKETING",
    //         position: "staff",
    //     };
    //     const response = await supertest(app)
    //         .put("/employees/1")
    //         .send(updateData)
    //         .expect(500);

    //     // expect(response.body).toEqual({
    //     //     error: "Database error",
    //     //     message: "something happen when deleting",
    //     // });
    //     jest.restoreAllMocks();
    //     await Employee.destroy({ where: { name: "employee1" } });
    // });
});
