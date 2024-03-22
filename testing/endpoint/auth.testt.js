const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");

describe("Test Auth", () => {
    // beforeAll(async () => {
    //     // await User.create({
    //     //     userId: null,
    //     //     username: "user1Doang",
    //     //     password:
    //     //         "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
    //     //     createdAt: "2024-03-14T09:07:29.202Z",
    //     //     updatedAt: "2024-03-14T09:07:29.202Z",
    //     // });
    //     await User.bulkCreate([
    //         {
    //             userId: 1,
    //             username: "user1",
    //             password:
    //                 "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
    //             createdAt: "2024-03-14T09:07:29.202Z",
    //             updatedAt: "2024-03-14T09:07:29.202Z",
    //         },
    //         {
    //             userId: 2,
    //             username: "user2",
    //             password:
    //                 "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
    //             createdAt: "2024-03-15T06:46:19.801Z",
    //             updatedAt: "2024-03-15T06:46:19.801Z",
    //         },
    //     ]);
    // });
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    // test.each([
    //     [0, 0],
    //     [1, 1],
    //     [50, 50],
    // ])(
    //     "should retrieve %i users (create %i users first)",
    //     async (expectedUsers, numUsersToCreate) => {
    //         for (let i = 0; i < numUsersToCreate; i++) {
    //             await User.create({
    //                 username: `user${i + 1}`,
    //                 password: "testpassword",
    //                 createdAt: "2024-03-14T09:07:29.202Z",
    //                 updatedAt: "2024-03-14T09:07:29.202Z",
    //             });
    //         }

    //         const response = await supertest(app).get("/users");
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveLength(expectedUsers);
    //         await User.destroy({ truncate: true, cascade: true });
    //     }
    // );

    // test.each([
    //     [0, 0],
    //     [1, 1],
    //     [25, 25],
    //     [50, 50],
    // ])(
    //     "should delete %i users (create %i users first) then delete %i users",
    //     async (numUsersToCreate) => {
    //         for (let i = 0; i < numUsersToCreate; i++) {
    //             await User.create({
    //                 username: `user${i}`,
    //                 password: "testpassword",
    //                 createdAt: "2024-03-14T09:07:29.202Z",
    //                 updatedAt: "2024-03-14T09:07:29.202Z",
    //             });
    //         }

    //         for (let i = 0; i < numUsersToCreate; i++) {
    //             const response = await supertest(app).delete(`/users/user${i}`);
    //             expect(response.status).toBe(200);
    //             expect(response.body).toEqual({ message: "delete successful" });
    //         }
    //     }
    // );

    // test("should retrieve 400 validation error", async () => {
    //     await User.create({
    //         username: `rzl`,
    //         password: "testpassword",
    //         createdAt: "2024-03-14T09:07:29.202Z",
    //         updatedAt: "2024-03-14T09:07:29.202Z",
    //     });

    //     const response = await supertest(app).delete(`/users/rzl`);
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         message: "Username atleast 4 and not contain space",
    //     });
    // });

    test("should create a new user with valid credentials", async () => {
        const newUserData = {
            username: "testuser",
            password: "strong_password",
        };

        const response = await request(app)
            .post("/signup")
            .send(newUserData)
            .expect(201); // Expect a created (201) response

        expect(response.body).toHaveProperty("token"); // Check for token in response
    });

    // test("should retrieve 400 validation error", async () => {
    //     await User.create({
    //         username: `rzl`,
    //         password: "testpassword",
    //         createdAt: "2024-03-14T09:07:29.202Z",
    //         updatedAt: "2024-03-14T09:07:29.202Z",
    //     });

    //     const response = await supertest(app).delete(`/users/rzl`);
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         message: "Username atleast 4 and not contain space",
    //     });
    // });

    // test("should retrieve 500 internal error", async () => {
    //     jest.spyOn(User, "findAll").mockRejectedValue(
    //         new Error("Database error")
    //     );
    //     const response = await supertest(app).get("/users");

    //     expect(response.status).toBe(500);
    //     expect(response.body).toEqual({ error: "Database error" });
    // });

    // test.each([
    //     [0, 0],
    //     [1, 1],
    //     [50, 50],
    // ])(
    //     "should retrieve %i users (create %i users first)",
    //     async (expectedUsers, numUsersToCreate) => {
    //         jest.clearAllMocks();

    //         for (let i = 0; i < numUsersToCreate; i++) {
    //             await User.create({
    //                 username: `user${i + 1}`,
    //                 password: "test pw",
    //                 createdAt: "2024-03-14T09:07:29.202Z",
    //                 updatedAt: "2024-03-14T09:07:29.202Z",
    //             });
    //         }

    //         const response = await supertest(app).get("/users");
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveLength(expectedUsers);
    //         await User.destroy({ truncate: true, cascade: true });
    //     }
    // );
});
