const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Book = require('./book')

const BookImage = sequelize.define("bookImage",
  {
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Book,
        key: 'bookID',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    },
    image: {
      type: DataTypes.STRING(255), 
      allowNull: false,
      primaryKey: true,
    },
    ssn: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

Book.hasMany(BookImage, { foreignKey: 'bookID' });
BookImage.belongsTo(Book, { foreignKey: 'bookID' });

module.exports = BookImage