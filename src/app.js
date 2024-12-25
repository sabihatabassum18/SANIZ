import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import errorHandler from './middleware/errorMiddleware.js';

import userRoutes from './Routes/user.routes.js'
import imageRoutes from './Routes/image.routes.js'


configDotenv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', imageRoutes);

// Error Handler
app.use(errorHandler);

export default app;
