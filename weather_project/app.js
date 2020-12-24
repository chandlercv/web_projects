/* eslint-disable no-console */
const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
  const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?appid=d0b7df5b8a7c1a66d06f26c12b56f258&zip=37934&units=imperial';
  https.get(weatherAPI, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const { temp, feels_like: feelsLike } = weatherData.main;
      const { description, icon } = weatherData.weather[0];
      console.log(`${temp} ${feelsLike} ${description}`);
      res.write('<h1>');
      res.write(`The temperature in ${weatherData.name} is ${temp}&#8457;. `, 'utf8');
      res.write('</h1>');
      res.write('<p>');
      res.write(`The weather outside is ${description}. `);
      res.write('<p>');
      res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
      res.send();
    });
  });
});

app.listen(3145, () => {
  console.log('server is running on port 3145');
});
