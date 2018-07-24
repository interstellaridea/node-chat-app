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