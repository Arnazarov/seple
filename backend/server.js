import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoConnect from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import talkRoutes from './routes/talkRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Configure environment variables
dotenv.config();

// Initialize express app
const app = express();
const __dirname = path.resolve();
// Connect to MongoDB server
mongoConnect();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/talk', talkRoutes);
app.use('/api/message', messageRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(8000, () => {
  console.log('Server is running on port 8000'.yellow.bold);
});
