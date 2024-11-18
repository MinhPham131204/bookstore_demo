const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    discountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Discount",
        key: "discountID",
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE", 
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Book", 
        key: "bookID",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE", 
    },
  };

  const options = {
    tableName: "DiscountDetail",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("DiscountDetail", attributes, options);
}
