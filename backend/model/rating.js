const { DataTypes } = require("sequelize");
const sequelize = require("../database/configDB");

const Customer = require('./customer')
const Book = require('./book')

const Rating = sequelize.define("Rating",
  {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer, // References the 'Customer' table
        key: 'userID',
      },
      onDelete: 'CASCADE', // Reflects 'on delete cascade'
      onUpdate: 'CASCADE', // Reflects 'on update cascade'
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book, // References the 'Book' table
        key: 'bookID',
      },
      onDelete: 'CASCADE', // Reflects 'on delete cascade'
      onUpdate: 'CASCADE', // Reflects 'on update cascade'
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

Customer.hasMany(Rating, { foreignKey: "customerID" });
Rating.belongsTo(Customer, { foreignKey: "customerID" });

Book.hasMany(Rating, { foreignKey: "bookID" });
Rating.belongsTo(Book, { foreignKey: "bookID" });

// Customer.belongsToMany(Book, { through: Rating, foreignKey: 'customerID' });
// Book.belongsToMany(Customer, { through: Rating, foreignKey: 'bookID' });

module.exports = Rating