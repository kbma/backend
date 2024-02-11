const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gérez les connexions WebSocket
io.on('connection', (socket) => {
  console.log('Nouvelle connexion WebSocket établie');

  // Écoutez les messages du client
  socket.on('chatMessage', (message) => {
    // Émettez le message à tous les clients connectés
    io.emit('chatMessage', message);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Serveur WebSocket écoutant sur le port ${port}`);
});
