const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
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
    image: {
      type: DataTypes.STRING(255), // Maps to varchar(255)
      allowNull: false,
    },
  };

  const options = {
    tableName: "bookImage",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("bookImage", attributes, options);
}
