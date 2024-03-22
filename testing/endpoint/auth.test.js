const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");
const { hashPassword } = require("../../utils/bcrypt");

describe("SignUp /registration ", () => {
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test("should create a new user with valid credentials", async () => {
        const newUserData = {
            username: "testuser",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/registration")
            .send(newUserData)
            .expect(201);

        expect(response.body).toHaveProperty("token");
        await User.destroy({ where: { username: "testuser" } });
    });

    test("should retrieve 400 username validation error", async () => {
        const newUserData = {
            username: "rzl",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/registration")
            .send(newUserData)
            .expect(400);

        expect(response.body).toEqual({
            message:
                "Username must be at least 4 characters long and should not contain spaces.",
        });
    });

    test("should retrieve 400 password validation error", async () => {
        const newUserData = {
            username: "rizal",
            password: "pw123",
        };

        const response = await supertest(app)
            .post("/registration")
            .send(newUserData)
            .expect(400);

        expect(response.body).toEqual({
            message: "Password must be at least 6 characters long.",
        });
    });

    test("should retrieve 400 user already exists", async () => {
        await User.create({
            username: "testuser",
            password: "strong_password",
        });
        const newUserData = {
            username: "testuser",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/registration")
            .send(newUserData)
            .expect(400);

        expect(response.body).toEqual({
            message: "User already exists",
        });
        await User.destroy({ where: { username: "testuser" } });
    });

    test("{DB ERROR CHECK} should retrieve 500 internal error", async () => {
        jest.spyOn(User, "create").mockRejectedValue(
            new Error("Database error")
        );

        const newUserData = {
            username: "testuser",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/registration")
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

describe("SignIn /auth ", () => {
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test("should get a token", async () => {
        const hashedPassword = await hashPassword("strong_password");

        await User.create({
            username: "testuser",
            password: hashedPassword,
        });
        const newUserData = {
            username: "testuser",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/auth")
            .send(newUserData)
            .expect(200);

        expect(response.body).toHaveProperty("token");
        await User.destroy({ where: { username: "testuser" } });
    });

    test("should retrieve 400 username validation error", async () => {
        const newUserData = {
            username: "rzl",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/auth")
            .send(newUserData)
            .expect(400);

        expect(response.body).toEqual({
            message:
                "Username must be at least 4 characters long and should not contain spaces.",
        });
    });

    test("should retrieve 400 password validation error", async () => {
        const newUserData = {
            username: "rizal",
            password: "pw123",
        };

        const response = await supertest(app)
            .post("/registration")
            .send(newUserData)
            .expect(400);

        expect(response.body).toEqual({
            message: "Password must be at least 6 characters long.",
        });
    });

    test("should retrieve 401 wrong username", async () => {
        const hashedPassword = await hashPassword("strong_password");

        await User.create({
            username: "testuser",
            password: hashedPassword,
        });
        const newUserData = {
            username: "wrong_user",
            password: "strong_password",
        };

        const response = await supertest(app)
            .post("/auth")
            .send(newUserData)
            .expect(401);
        expect(response.body).toEqual({
            message: "Invalid username or password",
        });
        await User.destroy({ where: { username: "testuser" } });
    });

    test("should retrieve 401 wrong password", async () => {
        const hashedPassword = await hashPassword("strong_password");

        await User.create({
            username: "testuser",
            password: hashedPassword,
        });
        const newUserData = {
            username: "testuser",
            password: "wrong_password",
        };

        const response = await supertest(app)
            .post("/auth")
            .send(newUserData)
            .expect(401);
        expect(response.body).toEqual({
            message: "Invalid username or password",
        });
        await User.destroy({ where: { username: "testuser" } });
    });
});
