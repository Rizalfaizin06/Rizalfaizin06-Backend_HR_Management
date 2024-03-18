"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Attendance.belongsTo(models.Employee, {
                foreignKey: "employeeId",
            });
        }
    }
    Attendance.init(
        {
            attendanceId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Employee",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            attend: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            checkIn: DataTypes.TIME,
            breakIn: DataTypes.TIME,
            breakOut: DataTypes.TIME,
            checkOut: DataTypes.TIME,
            workingHour: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Attendance",
        }
    );
    return Attendance;
};
