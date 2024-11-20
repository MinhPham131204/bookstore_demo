const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Discount = require('./discount')
const Book = require('./book')

const DiscountDetail = sequelize.define("DiscountDetail", 
  {
    discountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Discount.belongsToMany(Book, { through: DiscountDetail });
Book.belongsToMany(Discount, { through: DiscountDetail });

module.exports = DiscountDetail