"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Employees", {
            employeeId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            departement: {
                type: Sequelize.STRING,
            },
            position: {
                type: Sequelize.STRING,
            },
            domicile: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,

                validate: { isEmail: true },
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Employees");
    },
};
