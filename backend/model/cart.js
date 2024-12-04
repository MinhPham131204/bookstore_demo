const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Customer = require('./customer')
const Book = require('./book')

const Cart = sequelize.define("Cart", 
  {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Customer, // Name of the related table
        sourceKey: 'userID',
      },
      onDelete: 'CASCADE', // Aligns with `ON DELETE CASCADE`
      onUpdate: 'CASCADE', // Aligns with `ON UPDATE CASCADE`
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
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

Customer.hasMany(Cart, { foreignKey: 'customerID' })
Cart.belongsTo(Customer, { foreignKey: 'customerID' })

Book.hasMany(Cart, { foreignKey: 'bookID' })
Cart.belongsTo(Book, { foreignKey: 'bookID' })

module.exports = Cart