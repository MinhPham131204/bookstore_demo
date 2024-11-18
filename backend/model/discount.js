const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    discountID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Preferential", 
        key: "ID",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE", 
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value) {
          if (value <= this.startDate) {
            throw new Error(
              "endDate must be greater than or equal to startDate"
            );
          }
        },
      },
    },
    allBookFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default is 0
    },
  };

  const options = {
    tableName: "Discount",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Discount", attributes, options);
}
