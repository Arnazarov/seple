import express from 'express';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoConnect from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import talkRoutes from './routes/talkRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Configure environment variables
dotenv.config();

// Initialize express app
const app = express();
const __dirname = path.resolve();

// Connect to MongoDB server
mongoConnect();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/talk', talkRoutes);
app.use('/api/message', messageRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --------------------------PRODUCTION---------------------------------

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Development mode is running...');
  });
}

// --------------------------PRODUCTION---------------------------------

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

let users = [];

const addUser = (userID, socketID) => {
  !users.some((user) => user.userID === userID) &&
    users.push({ userID, socketID });
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketID !== socketID);
};

const getUserByID = (userID) => {
  return users.find((user) => user.userID === userID);
};
const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: 'http://localhost:3000' },
});

io.on('connection', (socket) => {
  console.log('Connected to a socket.io');
  io.emit('welcome', 'This is a welcome message');

  socket.on('addUser', (userID) => {
    addUser(userID, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMsg', ({ senderID, receiverID, msg }) => {
    const user = getUserByID(receiverID);
    io.to(user?.socketID).emit('receiveMsg', { senderID, msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
