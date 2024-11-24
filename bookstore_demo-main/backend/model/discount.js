const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB');

const Preferential = require("./preferential");

const Discount = sequelize.define("Discount", 
  {
    discountID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Preferential, 
        sourceKey: "ID",
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

Preferential.hasMany(Discount)
Discount.belongsTo(Preferential)

module.exports = Discount