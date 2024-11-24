const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Book = require('./book')

const BookImage = sequelize.define("bookImage",
  {
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        sourceKey: 'bookID',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    },
    image: {
      type: DataTypes.STRING(255), 
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

Book.hasMany(BookImage)
BookImage.belongsTo(Book)

module.exports = BookImage