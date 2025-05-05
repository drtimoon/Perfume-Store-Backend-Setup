const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError'); // Create this utility

exports.protect = async (req, res, next) => {
  try {
    // 1. Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt; // For web applications
    }

    if (!token) {
      return next(new AppError('Not authenticated. Please log in!', 401));
    }

    // 2. Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('User no longer exists', 401));
    }

    // 4. Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('Password changed! Please log in again.', 401));
    }

    // 5. Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token expired! Please log in again.', 401));
    }
    next(err);
  }
};

// Role-based authorization
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};