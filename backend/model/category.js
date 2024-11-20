const { DataTypes } = require("sequelize");

const sequelize = require('../database/configDB')

const Category = sequelize.define("Category", 
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superID: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null because of `ON DELETE SET NULL`
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Category.hasMany(Category, { foreignKey: 'superID', sourceKey: 'ID' });
Category.belongsTo(Category, { foreignKey: 'superID', targetKey: 'ID' });

module.exports = Category