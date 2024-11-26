const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const DeliveryFee = sequelize.define("DeliveryFee", 
  {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

module.exports = DeliveryFee