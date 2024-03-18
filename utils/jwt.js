const jwt = require("jsonwebtoken");

const secret = "KUNCINYA_RAHASIA_BANGET_LOH";

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken,
};
