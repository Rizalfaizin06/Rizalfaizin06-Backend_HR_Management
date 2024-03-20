const { findAll } = require("../models/user");

describe("getUser", () => {
    it("should return all users", async () => {
        // Mock the request and response objects
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Mock the User.findAll function
        const mockUsers = [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" },
        ];
        findAll.mockResolvedValue(mockUsers);

        // Call the getUser function
        await getUser(req, res);

        // Verify the response
        expect(res.json).toHaveBeenCalledWith(mockUsers);
        expect(res.status).not.toHaveBeenCalled();
    });

    // it("should handle errors", async () => {
    //     // Mock the request and response objects
    //     const req = {};
    //     const res = {
    //         json: jest.fn(),
    //         status: jest.fn().mockReturnThis(),
    //     };

    //     // Mock the User.findAll function to throw an error
    //     const mockError = new Error("Database error");
    //     findAll.mockRejectedValue(mockError);

    //     // Call the getUser function
    //     await getUser(req, res);

    //     // Verify the response
    //     expect(res.json).not.toHaveBeenCalled();
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    // });
});
