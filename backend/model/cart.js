const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer", // Name of the related table
        key: "userID",
      },
      onDelete: "CASCADE", // Aligns with `ON DELETE CASCADE`
      onUpdate: "CASCADE", // Aligns with `ON UPDATE CASCADE`
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: "Book", // Name of the related table
        key: "bookID",
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE", 
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Ensures quantity is at least 1
      },
    },
  };

  const options = {
    tableName: "Cart",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Cart", attributes, options);
}
