const os = require('os'); 
// Informations sur le système 
console.log(`Total Memory: ${os.totalmem()/(1024*1024*1024)} Go`); 
console.log(`Free Memory: ${os.freemem()/(1024*1024*1024)} Go`); 