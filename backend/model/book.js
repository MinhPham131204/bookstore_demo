const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    bookID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT, // `nvarchar(max)` maps to Sequelize's TEXT type
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: "Category", // Name of the related table
        key: "ID",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    price: {
      type: DataTypes.DECIMAL(19, 4), // `money` in SQL maps to DECIMAL
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    publishYear: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      validate: {
        is: /^[1-2][0-9]{3}$/, // Ensures valid year format
      },
    },
    numOfPages: {
      type: DataTypes.SMALLINT,
    },
    bookWeight: {
      type: DataTypes.SMALLINT,
    },
    soldAmount: {
      type: DataTypes.INTEGER,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0, // Ensures stockQuantity >= 0
      },
    },
  };

  const options = {
    tableName: "Book",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Book", attributes, options);
}
