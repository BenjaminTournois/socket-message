const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var cors = require('cors');
var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  socket.on('message', (data) => {
    console.log(data);
      io.to(data.room).emit('message', {text:data.text, userName:socket.userName});
  });

  socket.on('joinRoom', function (data) {
    const room = data.room;
    socket.join(room);
    socket.userName = data.userName;
    console.log("Salon rejoint : " + room);
  });

  socket.on('leaveRoom', function(room) {
    socket.leave(room);
    console.log("Salon quitté : " + room);
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});