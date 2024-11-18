const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[^@]+@gmail\.com$/i, // Ensures the email ends with @gmail.com
      },
    },
    hashPassword: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phoneNum: {
      type: DataTypes.CHAR(10),
      validate: {
        isNumeric: true, // Ensures the value contains only numbers
      },
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bankAccount: {
      type: DataTypes.CHAR(10),
      validate: {
        isNumeric: true, // Ensures the value contains only numbers
      },
    },
  };

  const options = {
    tableName: "Customer",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Customer", attributes, options);
}
