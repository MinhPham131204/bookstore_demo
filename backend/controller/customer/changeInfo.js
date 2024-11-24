const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Customer = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// Endpoint for retrieving and updating personal information
app.post('/change-personal-info', async (req, res) => {
  const { email, newInfo } = req.body;  // Assuming newInfo contains the updated data (e.g., phone number, address)

  try {
    // 1. Requesting the current personal information
    // Fetch the user's current information from the database
    const customer = await Customer.findOne({
      where: { email: email }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // 2. If information retrieval is successful, return current data
    res.status(200).json({
      message: 'Personal information retrieved successfully',
      currentInfo: {
        username: customer.username,
        email: customer.email,
        phoneNum: customer.phoneNum,
        userAddress: customer.userAddress,
      }
    });

    // 3. Allowing the user to change the information (updating)
    // Update the customer's information
    await Customer.update(newInfo, { where: { email: email } });

    // 4. Returning success message after update
    res.status(200).json({
      message: 'Personal information updated successfully',
      updatedInfo: newInfo
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// To start the server (you can adjust port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
