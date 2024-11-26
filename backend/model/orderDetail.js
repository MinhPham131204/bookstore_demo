const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Orders = require('./order')
const Book = require('./book')

const OrderDetail = sequelize.define("OrderDetail", 
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: Orders, // Name of the related table
        sourceKey: "orderID",
      },
      onDelete: "CASCADE", // Aligns with `ON DELETE SET NULL`
      onUpdate: "CASCADE", // Aligns with `ON UPDATE CASCADE`
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book, // Name of the related table
        sourceKey: "bookID",
      },
      onDelete: "CASCADE", // Aligns with `ON DELETE CASCADE`
      onUpdate: "CASCADE", // Aligns with `ON UPDATE CASCADE`
    },
    quantity: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        min: 1, // Ensures quantity is greater than 0
      },
    },
    price: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

Orders.hasMany(OrderDetail, { foreignKey: "orderID" });
OrderDetail.belongsTo(Orders, { foreignKey: "orderID" });

Book.hasMany(OrderDetail, { foreignKey: "bookID" });
OrderDetail.belongsTo(Book, { foreignKey: "bookID" });

module.exports = OrderDetail