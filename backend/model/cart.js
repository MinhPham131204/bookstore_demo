const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Customer = require('./customer')
const Book = require('./book')

const Cart = sequelize.define("Cart", 
  {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer, // Name of the related table
        sourceKeykey: 'userID',
      },
      onDelete: 'CASCADE', // Aligns with `ON DELETE CASCADE`
      onUpdate: 'CASCADE', // Aligns with `ON UPDATE CASCADE`
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Book, // Name of the related table
        sourceKey: 'bookID',
      },
      onDelete: 'SET NULL', // Aligns with `ON DELETE SET NULL`
      onUpdate: 'CASCADE', // Aligns with `ON UPDATE CASCADE`
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Ensures quantity is at least 1
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Customer.belongsToMany(Book, { through: Cart });
Book.belongsToMany(Customer, { through: Cart });

module.exports = Cart