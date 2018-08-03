const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connection');

    // emit to user that joined, from admin, text welcome chat
    // broadcast to sockets that new user joined from admin
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('chatAppAdmin','New User joined the room'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

app.get('/', (req, res) => {
  res.render('index.html')
});

server.listen(port, () => {
  console.log(`Express on port ${port}`);
});