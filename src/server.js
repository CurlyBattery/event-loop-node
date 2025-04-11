// Imports
const express = require('express');
const http = require('http');
const {Server} = require("socket.io");

// Initialization Express Serer
const server = express();

// Initialization Socket Server
const httpServer = http.createServer(server);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Settings Express Server
server.use(express.json());
server.use(express.static('public'));

// Settings Socket Server
io.on('connection', async (socket) => {

  // Event Loop
  // socket.send(synchronousFunction());
  //
  // Promise.resolve().then(() => socket.send(asynchronousFunction()));
  //
  // setTimeout(() => socket.send(timeOutFunction()));

  // Call Stack

  console.log('Two');
  socket.send('В Call Stack попал console.log(\'Two\')');
  socket.send('console.log(\'Two\') удалился из Call Stack');

  console.log('One');
  socket.send('В Call Stack попал console.log(\'One\')');
  socket.send('console.log(\'One\') удалился из Call Stack');


  function logThreeAndFour() {
    socket.send('В Call Stack попал logThreeAndFour()');
    logFour()
    console.log('Three');
    socket.send('В Call Stack попал console.log(\'Three\')');
    socket.send('console.log(\'Three\') удалился из Call Stack');
  }

  function logFour() {
    socket.send('В Call Stack попал logFour()');
    console.log('Four');
    socket.send('В Call Stack попал console.log(\'Four\')');
    socket.send('console.log(\'Four\') удалился из Call Stack');
  }

  logThreeAndFour();


  socket.on('disconnect', () => {
    console.log(`Client disconnected!`);
  });
})

// Routes
server.use('/', (req, res) => {
  return res.send('Hello World!');
});

// Start Express Server
server.listen(8080, () => {
  console.log(`Server started on url: http://localhost:8080`);
});

// Start Socket Server
httpServer.listen(8081, () => {
  console.log(`Socket Server started on url: http://localhost:8081`);
});