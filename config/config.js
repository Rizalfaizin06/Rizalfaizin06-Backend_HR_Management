const dotenv = require("dotenv"); // Import the dotenv package

// Load environment variables from a dedicated `.env` file (outside version control)
dotenv.config({ path: ".env" });

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USERNAME_TEST, // Use separate variables for test environment
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_DATABASE_TEST,
        host: process.env.DB_HOST_TEST,
        dialect: "postgres",
    },
    production: {
        username: process.env.DB_USERNAME_PROD, // Use separate variables for production environment
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_DATABASE_PROD,
        host: process.env.DB_HOST_PROD,
        dialect: "postgres",
    },
};
