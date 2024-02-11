//Serveur HTTP 
const http = require('http'); 
// Création du serveur HTTP 
const server = http.createServer((req, res) => { 
  // Gestion de la requête HTTP 
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  res.end('Hello, world!\n'); 
}); 
 
// Écoute du serveur sur le port 3000 
const PORT = 3000; 
server.listen(PORT, () => { 
  console.log(`Serveur HTTP écoutant sur le port ${PORT}`); 
});