const signIn = require("../controller/auth.controller").signIn; // Sesuaikan dengan path modul signIn Anda
const User = require("../models/user"); // Sesuaikan dengan path model User Anda

const req = {
    body: {
        username: "nonexistentuser",
        password: "password",
    },
};

it("should return 401 if Invalid username or password", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(() => ({
        id: 1,
        username: "nonexistentuser",
        password: "password",
    }));

    await signIn(req);
});
