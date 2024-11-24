const { DataTypes } = require("sequelize");
const sequelize = require("../database/configDB");

const Customer = require('./customer')
const Book = require('./book')

const Rating = sequelize.define("Rating",
  {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Customer.belongsToMany(Book, { through: Rating });
Book.belongsToMany(Customer, { through: Rating });

module.exports = Rating