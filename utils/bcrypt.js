const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}
function comparePassword(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};
