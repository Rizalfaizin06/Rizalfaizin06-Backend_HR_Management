const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");

describe("Test User Management", () => {
    afterEach(async () => {
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test.each([
        [0, 0],
        [1, 1],
        [50, 50],
    ])(
        "should retrieve %i users (create %i users first)",
        async (expectedUsers, numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await User.create({
                    username: `user${i + 1}`,
                    password: "test pw",
                    createdAt: "2024-03-14T09:07:29.202Z",
                    updatedAt: "2024-03-14T09:07:29.202Z",
                });
            }

            const response = await supertest(app).get("/users");
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(expectedUsers);
            await User.destroy({ truncate: true, cascade: true });
        }
    );

    test.each([
        [0, 0],
        [1, 1],
        [25, 25],
        [50, 50],
    ])(
        "should delete %i users (create %i users first) then delete %i users",
        async (numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await User.create({
                    username: `user${i}`,
                    password: "test pw",
                    createdAt: "2024-03-14T09:07:29.202Z",
                    updatedAt: "2024-03-14T09:07:29.202Z",
                });
            }

            for (let i = 0; i < numUsersToCreate; i++) {
                const response = await supertest(app).delete(`/users/user${i}`);
                expect(response.status).toBe(200);
            }
        }
    );

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
