let socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// listen for custom event
socket.on('newMessage', function (message) {

  let formattedTime = moment(message.createdAt).format("h:mm a");
  let li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location<a/>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Geolocation no supported by your browser');
  }

  locationButton.attr("disabled", "disabled").text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr("disabled").text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled").text('Send location');
    alert('Unable to fetch locaiton.');
  });
});