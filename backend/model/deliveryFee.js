const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    innerCityFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default value is 1
    },
    lowerWeight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    upperWeight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isGreaterThanLowerWeight(value) {
          if (value <= this.lowerWeight) {
            throw new Error("upperWeight must be greater than lowerWeight");
          }
        },
      },
    },
    fee: {
      type: DataTypes.DECIMAL(19, 4), // Maps to SQL's `money` type
      allowNull: false,
    },
  };

  const options = {
    tableName: "DeliveryFee",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("DeliveryFee", attributes, options);
}
