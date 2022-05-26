import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoConnect from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

// Configure environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB server
mongoConnect();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);



app.listen(8000, () => {
    console.log("Server is running on port 8000".yellow.bold);
})