const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    orderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    province: {
      type: DataTypes.STRING(20), // `nvarchar(20)` maps to Sequelize's STRING with a length of 20
    },
    orderAddress: {
      type: DataTypes.TEXT, // `nvarchar(max)` maps to Sequelize's TEXT
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
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null because of `ON DELETE SET NULL`
      references: {
        model: "DeliveryFee", // Name of the related table
        key: "ID",
      },
      onDelete: "SET NULL", // Aligns with `ON DELETE SET NULL`
      onUpdate: "CASCADE", // Aligns with `ON UPDATE CASCADE`
    },
  };

  const options = {
    tableName: "Orders",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Orders", attributes, options);
}
