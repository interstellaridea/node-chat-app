const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
  socket.emit('newMessage', {
    from: 'chatAppAdmin',
    text: 'Welcome to the chat app!'
  });
  socket.broadcast.emit('newMessage', {
    from: 'chatAppAdmin',
    text: 'New User joined the room',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log(message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

    //  reference for challenge.
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
})

app.get('/', (req, res) => {
  res.render('index.html')
});

server.listen(port, () => {
  console.log(`Express on port ${port}`);
});