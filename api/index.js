const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const writers = [];

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
    writers.splice(writers.indexOf(socket.userName), 1);
    io.to(data.room).emit('writing', { writers });
    io.to(data.room).emit('message', { text: data.text, userName: socket.userName });
  });

  socket.on('joinRoom', function (data) {
    const room = data.room;
    socket.join(room);
    socket.userName = data.userName;
    console.log(data.userName + ' à rejoint ' + room);
  });

  socket.on('writing', function (data) {
    if (!writers.includes(data.userName)) {
      writers.push(data.userName);
      io.to(data.room).emit('writing', { writers });
    }
    console.log(writers);
  });

  socket.on('stopWriting', function (data) {
    writers.splice(writers.indexOf(data.userName), 1);
    io.to(data.room).emit('writing', { writers });
    console.log(writers);
  });


  socket.on('disconnect', function (data) {
    console.log('user disconnected ' + socket.id);
    writers.splice(writers.indexOf(data.userName), 1);
    io.to(data.room).emit('writing', { writers });
  });

  socket.on('leaveRoom', function (room) {
    socket.leave(room);
    console.log("Salon quitté : " + room);
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});