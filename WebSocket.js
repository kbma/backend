const WebSocket = require('ws');
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie');

  // Écoutez les messages du client
  ws.on('message', (message) => {
    console.log(`Reçu du client : ${message}`);

    // Envoyez un message de retour au client
    ws.send(`Réponse du serveur : ${message}`);
  });

  // Envoie un message au client après la connexion
  ws.send('Connexion établie avec succès !');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Serveur WebSocket écoutant sur le port ${port}`);
});
