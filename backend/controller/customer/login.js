const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// A map to track failed login attempts per user (in a real-world scenario, consider a persistent store)
const failedLoginAttempts = {};

// 1a: User inputs the account name and requests to log in through the UI
app.post('/login', async (req, res) => {
  const { accountName, password } = req.body;

  // 1b: Login request sent from the UI to the system
  try {
    // 1c: Account verification from system to database
    const user = await User.findOne({
      where: {
        email: accountName, // Account name is treated as email
      },
    });

    // 2.1.a: If account not found, send response from database to system
    if (!user) {
      // 2.1.b: Report back to the UI from the system
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    // 2.2.a: If the account is found, proceed with password verification
    const isValidPassword = await bcrypt.compare(password, user.password);

    // 2.4.a: If the password is incorrect
    if (!isValidPassword) {
      // Track failed login attempts for the user
      failedLoginAttempts[accountName] = (failedLoginAttempts[accountName] || 0) + 1;

      // 2.4.b: Send incorrect password message to UI, repeat up to 4 times
      if (failedLoginAttempts[accountName] < 5) {
        return res.status(401).json({
          message: `Incorrect password. ${failedLoginAttempts[accountName] < 4 ? 'Please try again.' : 'Warning: One more attempt before lock.'}`,
        });
      }

      // 2.4.b (extended): If input is wrong 5 times or more
      if (failedLoginAttempts[accountName] >= 5) {
        // 2.4.c: Redirect to login page and suggest changing the password
        return res.status(403).json({
          message: 'Too many failed attempts. Please consider resetting your password.',
          redirectToLogin: true,
          suggestPasswordChange: true,
        });
      }
    }

    // 2.2.b: Successful login, move to the main page
    if (isValidPassword) {
      // Clear failed login attempts on successful login
      failedLoginAttempts[accountName] = 0;

      // Generate a JWT token for the user (example, replace with your logic)
      const token = jwt.sign({ userID: user.userID, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

      return res.status(200).json({
        message: 'Login successful',
        token,
        redirectToMainPage: true,
      });
    }

  } catch (error) {
    // 2.3.a: System failure
    console.error('System Error:', error);

    // 2.3.b: Request user to login later
    return res.status(500).json({
      message: 'System failure, please try logging in later.',
    });
  }
});

// To start the server (you can adjust port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
