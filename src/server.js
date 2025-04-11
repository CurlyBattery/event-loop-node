// Imports Global Module
const express = require('express');
const cors = require('cors');

// Initialization Express Serer
const server = express();

// Settings Express Server
server.use(express.json());
server.use(cors({ origin: '*' }));
server.use('/editor', express.static('public'));

// Routes
server.post('/loop', (req, res) => {
  let request = req.body;
  console.log(request);
  const sum = request.code + 50;
  res.send({message: sum});
});

// Start Express Server
server.listen(8080, () => {
  console.log(`Server started on url: http://localhost:8080/editor`);
});