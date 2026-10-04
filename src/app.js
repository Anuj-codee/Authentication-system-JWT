import express from  'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app=express();

app.use(express.json());
app.use(morgan("dev"))
app.use('/api/auth', authRoutes)
app.use(cookieParser());

export default app;