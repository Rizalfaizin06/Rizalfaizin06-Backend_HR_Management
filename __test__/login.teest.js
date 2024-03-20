const login = require("../controller/login"); // Replace with actual path
const User = require("../models/user"); // Replace with actual path (if applicable)
const comparePassword = jest.fn(); // Mock comparePassword function
const generateToken = jest.fn(); // Mock generateToken function

jest.mock("../models", () => ({
    User: {
        findOne: jest.fn(),
    },
}));

describe("login function", () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // it("should return 401 for invalid username", async () => {
    //     User.findOne.mockResolvedValueOnce({
    //         username: "testuser",
    //         password: "hashedPassword",
    //     });
    //     await login(mockReq, mockRes);

    //     expect(mockRes.status).toHaveBeenCalledWith(401);
    //     expect(mockRes.json).toHaveBeenCalledWith({
    //         message: "Invalid username or password",
    //     });
    //     expect(User.findOne).not.toHaveBeenCalled(); // User findOne not called for invalid username
    // });

    it("should return 401 for invalid password", async () => {
        User.findOne.mockResolvedValue({
            username: "testuser",
            password: "hashedPassword",
        });

        console.log(User.findOne);

        comparePassword.mockResolvedValue(false); // Mock comparePassword to return false

        await login(
            { body: { username: "testuser", password: "incorrectPassword" } },
            mockRes
        );

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Invalid username or password",
        });
        expect(comparePassword).toHaveBeenCalledWith(
            "incorrectPassword",
            "hashedPassword"
        );
    });

    // it("should generate token and return 200 for valid credentials", async () => {
    //     const mockUser = { username: "testuser", password: "hashedPassword" };
    //     User.findOne.mockResolvedValueOnce(mockUser);
    //     comparePassword.mockResolvedValueOnce(true);
    //     generateToken.mockReturnValueOnce("valid_token");

    //     await login(
    //         { body: { username: "testuser", password: "correctPassword" } },
    //         mockRes
    //     );

    //     expect(User.findOne).toHaveBeenCalledWith({
    //         where: { username: "testuser" },
    //     });
    //     expect(comparePassword).toHaveBeenCalledWith(
    //         "correctPassword",
    //         "hashedPassword"
    //     );
    //     expect(generateToken).toHaveBeenCalledWith(mockUser);
    //     expect(mockRes.status).toHaveBeenCalledWith(200);
    //     expect(mockRes.json).toHaveBeenCalledWith({ token: "valid_token" });
    // });
});
