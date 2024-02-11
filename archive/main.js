// main.js 
const { getWeather } = require('./weather'); 
 
const city = 'Bizerte'; 
getWeather(city) 
  .then(weatherData => { 
    console.log('Informations météorologiques pour', city, ':', weatherData); 
  }); 

/* // main.js 
const express = require('express'); 
const app = express(); 
const userController = require('./controllers/userController'); 
 
app.get('/user', (req, res) => { 
  const user = userController.getUser(); 
  res.json(user); 
}); 
 
const port = 3000; 
app.listen(port, () => { 
  console.log(`Serveur démarré sur http://localhost:${port}`); 
});



/* const mathOperations = require('./mathOperations'); 
const resultAdd = mathOperations.add(3, 5); 
const resultMultiply = mathOperations.multiply(2, 4); 
const age = mathOperations.age(2000); 
console.log('Addition:', resultAdd); 
console.log('Multiplication:', resultMultiply);
console.log('Votre age est:', age);  */