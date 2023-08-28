import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as redis from 'redis';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redisClient = redis.createClient();

io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    try {
        if (socket.connected) {
          io.emit('message', msg);
          redisClient.connect().then(() => {
            redisClient.rPush('chat_messages', JSON.stringify(msg));
            redisClient.quit();
        });
        } else {
          console.log('Socket is closed, message not sent.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
