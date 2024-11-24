const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// 1.1.a. User clicks "View Transaction History"
app.post('/transaction-history', async (req, res) => {
  const { accountName } = req.body;  // Account name of the user

  try {
    // 1.1.c. Retrieve transaction history from the database (assuming there's a transaction table)
    const user = await User.findOne({
      where: { email: accountName },
    });

    // 2.1.a. If user not found, return failure
    if (!user) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    // 2.2.a. Retrieve transaction history for the user
    const transactionHistory = await sequelize.query(
      `SELECT * FROM transactions WHERE userID = :userID`,
      {
        replacements: { userID: user.userID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // 2.2.b. If transactions are found, filter and return to UI
    if (transactionHistory.length > 0) {
      return res.status(200).json({
        message: 'Transaction history fetched successfully',
        transactions: transactionHistory,
      });
    } else {
      // 2.1.b. If no transactions found, return failure
      return res.status(404).json({
        message: 'No transaction history found',
      });
    }

  } catch (error) {
    // 2.1.c. If there is a failure while retrieving data, notify user
    console.error('System Error:', error);
    return res.status(500).json({
      message: 'System failure, please try again later.',
    });
  }
});

// To start the server (you can adjust port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
