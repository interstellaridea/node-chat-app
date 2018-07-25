let socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'seb@test.com',
    text: 'Yo how did i do?'
  });
  
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


// listen for custom event
socket.on('newMessage', function (message) {
  console.log('New Message', message);
});