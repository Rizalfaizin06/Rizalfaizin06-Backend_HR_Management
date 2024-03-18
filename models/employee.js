"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Attendance, {
                foreignKey: "employeeId",
            });
        }
    }
    Employee.init(
        {
            employeeId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            avatar: DataTypes.STRING,
            name: DataTypes.STRING,
            departement: DataTypes.STRING,
            position: DataTypes.STRING,
            domicile: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                },
            },
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Employee",
        }
    );
    return Employee;
};
