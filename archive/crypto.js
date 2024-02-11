const crypto = require('crypto'); 
// Génération d'un hachage 
const hash = crypto.createHash('sha256'); 
hash.update('Hello, Crypto!'); 
console.log(hash.digest('hex'));