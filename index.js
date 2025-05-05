// 1. Load environment first
require('dotenv').config({ debug: true });
console.log('🔍 ENV:', process.env);

// 2. Force synchronous DB connection
(async function() {
  try {
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', false);
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 3000,
      socketTimeoutMS: 20000,
      serverSelectionTimeoutMS: 3000
    });
    
    console.log('✅ MongoDB Connected to:', mongoose.connection.db.databaseName);
    
    // 3. Start Express only after DB connection
    const express = require('express');
    const app = express();
    
    // Middleware
    app.use(require('cors')());
    app.use(express.json());
    
    // 4. Simple test route
    app.get('/', (req, res) => {
      res.json({ status: 'Alive', db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' });
    });

    // =============================================
    // NEW: Route imports (add after basic middleware)
    // =============================================
    const authRoutes = require('./routes/auth');
    const perfumeRoutes = require('./routes/perfumes');
    const cartRoutes = require('./routes/Cart');
    const userRoutes = require('./routes/users');

    // Mount routes
    app.use('/api/auth', authRoutes);
    app.use('/api/perfumes', perfumeRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/users', userRoutes);
    // =============================================

    // 5. Error handling middleware
    app.use((err, req, res, next) => {
      console.error('💥 Server Error:', err);
      res.status(500).send('Server Error');
    });
    
    
    // 6. Start server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🛒 Cart API: http://localhost:${PORT}/api/cart`);
      console.log(`👤 Auth API: http://localhost:${PORT}/api/auth`);
    });
    
    // 7. Keep-alive handler
    server.keepAliveTimeout = 60000;
    
  } catch (err) {
    console.error('❌ Fatal Startup Error:', err);
    process.exit(1);
  }
})();