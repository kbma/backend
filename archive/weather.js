// weather.js 
const axios = require('axios');
module.exports.getWeather = async (city) => {
    try {
        const response = await
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units
=metric&appid=6bfdc0ec4f1017a9ce36bed434e75f82`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques',
            error.message);
    }
}; 