const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");

describe("Test User Management", () => {
    beforeAll(async () => {});
    afterEach(async () => {
        jest.clearAllMocks();
        await User.destroy({ truncate: true, cascade: true });

        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test.each([
        [0, 0],
        [1, 1],
        // [50, 50],
    ])(
        "{GET /users} should retrieve %i users (create %i users first)",
        async (expectedUsers, numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await User.create({
                    username: `user${i + 1}`,
                    password: "testpassword",
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

    test("{GET /users DB ERROR CHECK} should retrieve 500 internal error", async () => {
        jest.spyOn(User, "findAll").mockRejectedValue(
            new Error("Database error")
        );
        const response = await supertest(app).get("/users");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Database error" });
        jest.restoreAllMocks();
    });

    test.each([
        [0, 0],
        [1, 1],
        // [25, 25],
        // [50, 50],
    ])(
        "{Delete /users/:username} should delete %i users (create %i users first) then delete %i users",
        async (numUsersToCreate) => {
            for (let i = 0; i < numUsersToCreate; i++) {
                await User.create({
                    username: `user${i}`,
                    password: "testpassword",
                    createdAt: "2024-03-14T09:07:29.202Z",
                    updatedAt: "2024-03-14T09:07:29.202Z",
                });
            }

            for (let i = 0; i < numUsersToCreate; i++) {
                const response = await supertest(app).delete(`/users/user${i}`);
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ message: "delete successful" });
            }
        }
    );

    test("{Delete /users/:username} should retrieve 404 not found", async () => {
        const response = await supertest(app).delete(`/users/rizalllllllllll`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: "not found",
        });
    });

    test("{Delete /users/:username} should retrieve 400 validation error", async () => {
        await User.create({
            username: `rzl`,
            password: "testpassword",
            createdAt: "2024-03-14T09:07:29.202Z",
            updatedAt: "2024-03-14T09:07:29.202Z",
        });

        const response = await supertest(app).delete(`/users/rzl`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Username atleast 4 and not contain space",
        });
    });

    test("{DELETE /users DB ERROR CHECK} should retrieve 500 internal error", async () => {
        await User.create({
            username: `rizal`,
            password: "testpassword",
            createdAt: "2024-03-14T09:07:29.202Z",
            updatedAt: "2024-03-14T09:07:29.202Z",
        });

        jest.spyOn(User, "destroy").mockRejectedValue(
            new Error("Database error")
        );

        const response = await supertest(app).delete(`/users/rizal`);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Database error",
            message: "something happen when deleting",
        });
        jest.restoreAllMocks();
        await User.destroy({ truncate: true, username: "rizal" });
    });
});
