const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    superID: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: "Category", // Self-referencing table
        key: "ID",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  };

  const options = {
    tableName: "Category",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Category", attributes, options);
}
