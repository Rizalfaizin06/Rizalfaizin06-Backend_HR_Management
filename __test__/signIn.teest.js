const signIn = require("../controller/auth.controller").signIn; // Sesuaikan dengan path modul signIn Anda
const User = require("../models/user"); // Sesuaikan dengan path model User Anda

// jest.mock("../models/user", () => ({
//     findOne: jest.fn(),
// }));

const req = {
    body: {
        username: "nonexistentuser",
        password: "password",
    },
};

it("should return 401 if Invalid username or password", async () => {
    User.findOne.mockResolvedValue(() => ({
        id: 1,
        username: "nonexistentuser",
        password: "password",
    }));
    // User.findOne.mockResolvedValue(null);

    await signIn(req);

    // expect(User.findOne).toHaveBeenCalledWith({
    //     where: { username: "nonexistentuser" },
    // });
    // expect(res.status).toHaveBeenCalledWith(401);
    // expect(res.json).toHaveBeenCalledWith({
    //     message: "Invalid username or password",
    // });
});
