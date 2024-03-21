// const supertest = require('supertest');
// const app = require('./app');
// const User = require('./model');

// describe('Auth API', () => {
//   it('should register a new user', async () => {
//     const response = await supertest(app).post('/register').send({
//       username: 'johndoe',
//       password: 'secret',
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('username', 'johndoe');
//   });

//   it('should login with the registered user', async () => {
//     const response = await supertest(app).post('/login').send({
//       username: 'johndoe',
//       password: 'secret',
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('username', 'johndoe');
//   });
// });

// const express = require("express");

// const app = express();
// const User = require("../../models/user");

// const supertest = require("supertest");
// const { app } = require("../../app");

// describe("GET /user", function () {
//     it("responds with json", async () => {
//         await supertest(app)
//             .get("/users")
//             // .set("Accept", "application/json")
//             // .expect("Content-Type", /json/)
//             .expect(200);
//     });
// });

const supertest = require("supertest");
const server = require("../../app");
const app = require("../../app");
const { Attendance, Employee, User } = require("../../models");

describe("API Barang", () => {
    beforeAll(async () => {
        // await User.create({
        //     userId: null,
        //     username: "user1Doang",
        //     password:
        //         "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
        //     createdAt: "2024-03-14T09:07:29.202Z",
        //     updatedAt: "2024-03-14T09:07:29.202Z",
        // });
        await User.bulkCreate([
            {
                userId: 1,
                username: "user1",
                password:
                    "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
                createdAt: "2024-03-14T09:07:29.202Z",
                updatedAt: "2024-03-14T09:07:29.202Z",
            },
            {
                userId: 2,
                username: "user2",
                password:
                    "$2b$10$L0PlOhsKD/t3sFlwPFwlXeWJ6JkOhsB8Y8vkql3DuJUPSgeRbvnYi",
                createdAt: "2024-03-15T06:46:19.801Z",
                updatedAt: "2024-03-15T06:46:19.801Z",
            },
        ]);
    });

    afterAll(async () => {
        await User.destroy({ truncate: true, cascade: true });
        // await sequelize.close();
        if (server && server.close) {
            await new Promise((resolve) => server.close(resolve));
        }
    });

    test("GET /barangs", async () => {
        const response = await supertest(app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});
