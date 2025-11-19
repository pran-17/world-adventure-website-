const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register/Sign up route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    // Validate input
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields (username, password, email, phone)' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Create new user
    const user = new User({
      username,
      password,
      email,
      phone
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: error.message 
    });
  }
});

// Login route - accepts email or username
router.post('/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate input
    if (!password || (!email && !username)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email (or username) and password' 
      });
    }

    // Find user by email (preferred) or username
    const searchField = email ? { email: email.toLowerCase() } : { username };
    const user = await User.findOne(searchField);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Booking route - save booking details
router.post('/booking', async (req, res) => {
  try {
    const { userId, fullName, aadhaarNo, totalPeople, package: packageName } = req.body;

    if (!userId || !fullName || !aadhaarNo || !totalPeople || !packageName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all booking details' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.bookingDetails = {
      fullName,
      aadhaarNo,
      totalPeople,
      package: packageName,
      bookingDate: new Date()
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Booking details saved successfully',
      bookingDetails: user.bookingDetails
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error saving booking details',
      error: error.message 
    });
  }
});

// Payment route - save payment details
router.post('/payment', async (req, res) => {
  try {
    const { 
      userId, 
      billingName, 
      billingEmail, 
      city, 
      state, 
      pinCode,
      cardName,
      cardNumber,
      expMonth,
      expYear,
      cvv
    } = req.body;

    if (!userId || !billingName || !billingEmail || !city || !state || !pinCode || 
        !cardName || !cardNumber || !expMonth || !expYear || !cvv) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all payment details' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.paymentDetails = {
      billingName,
      billingEmail,
      city,
      state,
      pinCode,
      cardName,
      cardNumber: cardNumber.toString().slice(-4), // Store only last 4 digits for security
      expMonth,
      expYear,
      cvv: '***', // Don't store actual CVV
      paymentDate: new Date()
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Payment details saved successfully',
      paymentDetails: user.paymentDetails
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error saving payment details',
      error: error.message 
    });
  }
});

module.exports = router;

