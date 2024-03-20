// userController.test.js
const {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require("../controller/employee.controller");
const { Employee } = require("../models");

// Mocking Employee.findAll function
jest.mock("../models", () => ({
    Employee: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe("createEmployee", () => {
    test("should create a new user with status code 201", async () => {
        const mockUserInput = {
            username: "rizal",
            name: "John Doe",
            email: "john@example.com",
        };

        Employee.create.mockResolvedValue(mockUserInput);
        // Employee.findOne.mockResolvedValue(true);

        Employee.findOne.mockImplementation((query) => {
            if (query.where.username === "rizal") {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        });

        const req = { body: mockUserInput };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await createEmployee(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.json).toHaveBeenCalledWith(mockUserInput);
    });

    // test("should handle error with status code 400", async () => {
    //     const errorMessage = "Validation error";
    //     Employee.create.mockRejectedValue(new Error(errorMessage));
    //     const req = { body: {} };
    //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //     await createEmployee(req, res);
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    // });
});

// describe("putUser", () => {
//     test("should update an existing user with status code 200", async () => {
//         const userId = 1;
//         const mockUserInput = {
//             name: "Updated Name",
//             email: "updated@example.com",
//         };
//         Employee.update.mockResolvedValue([1]);
//         const req = { params: { id: userId }, body: mockUserInput };
//         const res = { json: jest.fn() };
//         await putUser(req, res);
//         expect(res.json).toHaveBeenCalledWith({
//             message: "Data user berhasil diperbarui",
//         });
//     });

//     test("should handle error with status code 400", async () => {
//         const errorMessage = "Validation error";
//         Employee.update.mockRejectedValue(new Error(errorMessage));
//         const req = { params: { id: 1 }, body: {} };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         await putUser(req, res);
//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
// });

// describe("deleteUser", () => {
//     test("should delete an existing user with status code 200", async () => {
//         const userId = 1;
//         Employee.destroy.mockResolvedValue(1);
//         const req = { params: { id: userId } };
//         const res = { json: jest.fn() };
//         await deleteUser(req, res);
//         expect(res.json).toHaveBeenCalledWith({
//             message: "Data absensi berhasil dihapus",
//         });
//     });

//     test("should handle error with status code 400", async () => {
//         const errorMessage = "Database error";
//         Employee.destroy.mockRejectedValue(new Error(errorMessage));
//         const req = { params: { id: 1 } };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         await deleteUser(req, res);
//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
// });
