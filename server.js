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

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
