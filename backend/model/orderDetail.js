const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: "Orders", // Name of the related table
        key: "orderID",
      },
      onDelete: "CASCADE", // Aligns with `ON DELETE SET NULL`
      onUpdate: "CASCADE", // Aligns with `ON UPDATE CASCADE`
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Book", // Name of the related table
        key: "bookID",
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
      type: DataTypes.DECIMAL(19, 4), // Maps to SQL `money` type
      allowNull: true,
    },
  };

  const options = {
    tableName: "OrderDetail",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("OrderDetail", attributes, options);
}
