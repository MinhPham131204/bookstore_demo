const express = require('express');
const User = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// 1.1: User opens the logout interface and requests to log out
app.post('/logout', async (req, res) => {
  // 1.2: Logout request sent from the UI to the system
  try {
    // 2.1.a: If there is an error logging out, send error response from the system to the UI
    // (e.g., unable to clear session or logout action)
    if (req.session && req.session.userID) {
      // Clear the session to log out the user
      req.session.destroy((err) => {
        if (err) {
          // 2.1.b: Logout failed, please try again
          return res.status(500).json({
            message: 'Logout failed, please try again.',
          });
        }

        // 2.2.a: Logout successful, clear session and redirect
        return res.status(200).json({
          message: 'Logout successful',
          redirectToHomePage: true,
        });
      });
    } else {
      // 2.1.a: If no session is found, logout error
      return res.status(404).json({
        message: 'No active session found.',
      });
    }
  } catch (error) {
    // 2.3.a: System failure
    console.error('System Error:', error);

    // 2.3.b: Request user to try logging out later
    return res.status(500).json({
      message: 'System failure, please try logging out later.',
    });
  }
});

// To start the server (you can adjust port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});