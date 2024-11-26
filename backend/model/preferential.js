const { DataTypes } = require("sequelize");
const sequelize = require("../database/configDB");

const Preferential = sequelize.define("Preferential", 
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, 
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

module.exports = Preferential