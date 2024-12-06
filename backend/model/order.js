const { DataTypes } = require("sequelize");
const sequelize = require('../database/configDB')

const Customer = require('./customer')
const DeliveryFee = require('./deliveryFee')

const Orders = sequelize.define("Orders", 
  {
    orderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer, // Name of the related table
        sourceKey: 'userID',
      },
      onDelete: 'CASCADE', // Aligns with `ON DELETE CASCADE`
      onUpdate: 'CASCADE', // Aligns with `ON UPDATE CASCADE`
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    orderAddress: {
      type: DataTypes.TEXT, 
    },
    deliveryStatus: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Đang vận chuyển', 'Đã giao hàng', 'Đã hủy']],
          msg: 'Invalid delivery status',
        },
      },
      defaultValue: 'Đang vận chuyển',
    },
    orderedTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    paymentMethod: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Thanh toán trực tiếp', 'Ví điện tử', 'Internet Banking']],
          msg: 'Invalid payment method',
        },
      },
      defaultValue: 'Thanh toán trực tiếp',
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: DeliveryFee, // Name of the related table
        sourceKey: 'ID',
      },
      onDelete: 'SET NULL', // Aligns with `ON DELETE SET NULL`
      onUpdate: 'CASCADE', // Aligns with `ON UPDATE CASCADE`
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)

Customer.hasMany(Orders, { foreignKey: 'customerID' })
Orders.belongsTo(Customer, { foreignKey: 'customerID' })

DeliveryFee.hasMany(Orders, { foreignKey: 'deliveryFee' })
Orders.belongsTo(DeliveryFee, { foreignKey: 'deliveryFee' })

module.exports = Orders