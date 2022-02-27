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
  socket.on('join', (data) => {
    console.log(data);
  });
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
  });

  socket.on('join', (data) => {
    console.log(data);
    io.emit('message', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});