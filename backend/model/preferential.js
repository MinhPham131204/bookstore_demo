const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Reflects IDENTITY(1,1)
    },
    name: {
      type: DataTypes.STRING(255), // Maps to nvarchar(255)
      allowNull: true,
    },
    calculation: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        min: 0.01,
        max: 0.7,
      },
    },
  };

  const options = {
    tableName: "Preferential",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Preferential", attributes, options);
}
