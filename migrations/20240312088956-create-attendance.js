"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Attendances", {
            attendanceId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            employeeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Employees",
                    key: "employeeId",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            date: {
                type: Sequelize.DATE,
            },
            attend: {
                type: Sequelize.BOOLEAN,
            },
            checkIn: {
                type: Sequelize.TIME,
            },
            breakIn: {
                type: Sequelize.TIME,
            },
            breakOut: {
                type: Sequelize.TIME,
            },
            checkOut: {
                type: Sequelize.TIME,
            },
            workingHour: {
                type: Sequelize.DECIMAL,
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
        await queryInterface.dropTable("Attendances");
    },
};
