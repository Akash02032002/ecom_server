import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import { connectDB } from './lib/db.js';

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Connect to database and start server
(async () => {
  try {
    await connectDB();
    console.log('✅ Connected to database');

    // Middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(cookieParser());

    app.use(cors({
      origin: [process.env.CLIENT_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }));

    // Optional: Serve static files (e.g. images or uploads)
    // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/coupons', couponRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/analytics', analyticsRoutes);

    // Root route
    app.get('/', (req, res) => {
      res.send('✅ Server is working correctly');
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1); // Exit on fatal error
  }
})();
