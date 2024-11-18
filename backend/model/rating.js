const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer", // References the 'Customer' table
        key: "userID",
      },
      onDelete: "CASCADE", // Reflects 'on delete cascade'
      onUpdate: "CASCADE", // Reflects 'on update cascade'
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Book", // References the 'Book' table
        key: "bookID",
      },
      onDelete: "CASCADE", // Reflects 'on delete cascade'
      onUpdate: "CASCADE", // Reflects 'on update cascade'
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  };

  const options = {
    tableName: "Rating",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Rating", attributes, options);
}
