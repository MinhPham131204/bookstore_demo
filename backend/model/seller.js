const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    hashPassword: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  const options = {
    tableName: "Seller",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Seller", attributes, options);
}
