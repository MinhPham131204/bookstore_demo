const { DataTypes } = require("sequelize");
const sequelize = require("../database/configDB");

const Seller = sequelize.define("Seller", 
  {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

module.exports = Seller