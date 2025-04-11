// Imports Global Module
const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

// Initialization Express Serer
const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer, { cors: { origin: '*' }});

// Initialization Clients Map
let sequenceNumberByClient = new Map();

// Setting Socket Connection
io.on('connection', (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  sequenceNumberByClient.set(socket, 1);

  socket.on('disconnect', () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

// setInterval(() => {
//   for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//     client.emit('seq-num', sequenceNumber);
//     sequenceNumberByClient.set(client, sequenceNumber + 1);
//   }
// }, 1000);

// Running Http Socket Server
httpServer.listen(8000, () => {
  console.log(`Server started on url: http://localhost:8000`);
})

// Settings Express Server
server.use(express.json());
server.use(cors({ origin: '*' }));
server.use('/editor', express.static('public'));

// Routes
server.post('/loop', (req, res) => {
  let request = req.body;
  console.log(request);

  const logToFile = msg =>io.emit('seq-num', { message: msg });
  console.log = logToFile;

  new Function(`${request.code}`)();
  res.send({message: 'Готово'});
});

// Start Express Server
server.listen(8080, () => {
  console.log(`Server started on url: http://localhost:8080/editor`);
});

