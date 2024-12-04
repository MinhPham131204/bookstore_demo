const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Discount = require('./discount')
const Book = require('./book')

const DiscountDetail = sequelize.define("DiscountDetail", 
  {
    discountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Discount, 
        sourceKey: 'discountID',
      },
      onDelete: 'CASCADE', // Reflects 'on delete cascade'
      onUpdate: 'CASCADE', // Reflects 'on update cascade'
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Book, 
        sourceKey: 'ID',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Discount.hasMany(DiscountDetail, { foreignKey: 'discountID' })
DiscountDetail.belongsTo(Discount, { foreignKey: 'discountID' })

Book.hasMany(DiscountDetail, { foreignKey: 'bookID' })
DiscountDetail.belongsTo(Book, { foreignKey: 'bookID' })

module.exports = DiscountDetail