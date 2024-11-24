const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require("../../model/customer"); // Adjust path if needed
const sequelize = require("../../database/configDB");

const app = express();
app.use(express.json());

// 1. **Add book to cart**
// API to add book to the cart
app.post('/addToCart', async (req, res) => {
  const { bookID, quantity, userID } = req.body;

  try {
    // Add book to cart logic
    const bookInCart = await sequelize.query(`
      INSERT INTO Cart (bookID, quantity, userID)
      VALUES (${bookID}, ${quantity}, ${userID})
    `);

    return res.status(200).json({
      message: 'Book added to cart successfully',
    });
  } catch (error) {
    console.error('Error adding book to cart:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 2. **View Cart**
// API to retrieve the cart
app.get('/viewCart', async (req, res) => {
  const { userID } = req.query;

  try {
    const cartData = await sequelize.query(`
      SELECT * FROM Cart WHERE userID = ${userID}
    `);

    if (!cartData) {
      return res.status(404).json({ message: 'No items found in your cart' });
    }

    return res.status(200).json({ cart: cartData });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 3. **Remove book from cart**
// API to remove a book from the cart
app.delete('/removeFromCart', async (req, res) => {
  const { bookID, userID } = req.body;

  try {
    const result = await sequelize.query(`
      DELETE FROM Cart WHERE bookID = ${bookID} AND userID = ${userID}
    `);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found in the cart' });
    }

    return res.status(200).json({ message: 'Book removed from cart successfully' });
  } catch (error) {
    console.error('Error removing book from cart:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 4. **Confirm purchase**
// API to confirm purchase
app.post('/confirmPurchase', async (req, res) => {
  const { userID, totalAmount } = req.body;

  try {
    // Process confirmation logic
    // (simulating the confirmation logic, e.g., checking stock or payment info)
    const confirmation = await sequelize.query(`
      INSERT INTO Orders (userID, totalAmount, status) 
      VALUES (${userID}, ${totalAmount}, 'Confirmed')
    `);

    return res.status(200).json({
      message: 'Purchase confirmed successfully',
      orderID: confirmation.insertId,
    });
  } catch (error) {
    console.error('Error confirming purchase:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 5. **Place order (Direct)**
// API to place the order
app.post('/placeOrder', async (req, res) => {
  const { userID, orderID } = req.body;

  try {
    // Process the order, saving it to transaction history
    const orderPlaced = await sequelize.query(`
      INSERT INTO TransactionHistory (userID, orderID, status) 
      VALUES (${userID}, ${orderID}, 'Placed')
    `);

    return res.status(200).json({
      message: 'Order placed successfully',
      transactionID: orderPlaced.insertId,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 6. **Payment transfer (Bank transfer)**
// API for transfer payment
app.post('/transferPayment', async (req, res) => {
  const { userID, transferAmount } = req.body;

  try {
    // Handle bank transfer logic (simulated)
    const paymentConfirmed = await sequelize.query(`
      INSERT INTO Payments (userID, amount, status) 
      VALUES (${userID}, ${transferAmount}, 'Transferred')
    `);

    return res.status(200).json({
      message: 'Payment successfully transferred',
    });
  } catch (error) {
    console.error('Error processing transfer payment:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// 7. **Confirm payment**
// API to confirm the payment
app.post('/confirmPayment', async (req, res) => {
  const { userID, orderID, paymentStatus } = req.body;

  try {
    // Confirm payment status and order completion
    const paymentConfirmed = await sequelize.query(`
      UPDATE Orders 
      SET status = '${paymentStatus}' 
      WHERE orderID = ${orderID} AND userID = ${userID}
    `);

    return res.status(200).json({
      message: 'Payment confirmed and order processed',
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return res.status(500).json({ message: 'System failure, please try again later' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
