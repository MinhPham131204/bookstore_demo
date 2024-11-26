const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// A map to track failed login attempts per user (in a real-world scenario, consider a persistent store)
const failedLoginAttempts = {};

// 1.1: User opens the login interface and selects "Forgot Password" option
app.post('/forgot-password', async (req, res) => {
  const { accountName } = req.body;

  // 1.2: Gửi yêu cầu thay đổi mật khẩu (Send request for password change)
  try {
    // 1.3: Yêu cầu nhập địa chỉ email (Request email address input)
    const user = await User.findOne({ where: { email: accountName } });

    // 2.1.a: Địa chỉ email không hợp lệ (Invalid email address)
    if (!user) {
      return res.status(404).json({ message: 'Email address is invalid.' });
    }

    // 2.2.a: Địa chỉ email hợp lệ (Valid email address)
    // Send password reset email
    const resetToken = jwt.sign({ userID: user.userID, email: user.email }, 'your_jwt_secret', { expiresIn: '15m' });

    // 2.2.b: Gửi email chứa mã đặt lại mật khẩu (Send email with password reset token)
    // Here, you would integrate an email service to send the reset link to the user
    console.log(`Password reset token for ${user.email}: ${resetToken}`);

    // 2.2.c: Đã gửi email thay đổi mật khẩu (Password change email sent)
    return res.status(200).json({
      message: 'Password change email has been sent.',
    });
  } catch (error) {
    console.error('System Error:', error);
    return res.status(500).json({
      message: 'System failure, please try again later.',
    });
  }
});

// 3.1: User inputs the new password and confirms the change
app.post('/change-password', async (req, res) => {
    const { resetToken, newPassword } = req.body;
  
    try {
      // 3.1.b: Yêu cầu thay đổi mật khẩu (Request password change)
      const decoded = jwt.verify(resetToken, 'your_jwt_secret');
  
      // 3.1.c: Ghi đè mật khẩu mới lên cái cũ (Override old password with new one)
      const user = await User.findOne({ where: { userID: decoded.userID } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ hashPassword: hashedPassword }); // Use 'hashPassword' instead of 'password'
  
      // 3.2.a: Xác nhận thay đổi thành công (Confirm successful change)
      // 3.2.b: Xác nhận thay đổi thành công (Confirm successful change)
      return res.status(200).json({
        message: 'Password successfully changed.',
      });
  
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({
        message: 'Failed to change password, please try again later.',
      });
    }
  });
