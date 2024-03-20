// module.exports = {
//     comparePassword: jest.fn(() => Promise.resolve(true)), // Mock successful comparison
//     hashPassword: jest.fn(() => Promise.resolve("hashedPassword")), // Mock hashing result
// };

// __mocks__/bcrypt.js

const bcrypt = jest.createMockFromModule("bcrypt");

// Mock the compare function
bcrypt.compare = jest.fn(() => Promise.resolve(true));

// Mock the hash function if needed
bcrypt.hash = jest.fn(() => Promise.resolve("hashedPassword"));

module.exports = bcrypt;
