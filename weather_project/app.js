/* eslint-disable no-console */
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(3145, () => {
  console.log('server is running on port 3145');
});

function getWeather(res, locMethod, locator, units) {
  const apiKey = 'd0b7df5b8a7c1a66d06f26c12b56f258';

  let unitSymbol;
  switch (units) {
    case 'imperial':
      unitSymbol = '&#8457;';
      break;
    case 'metric':
      unitSymbol = '&#8451;';
      break;
    default:
      unitSymbol = 'K';
  }

  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&${locMethod}=${locator}&units=${units}`;
  https.get(weatherAPI, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const { temp, feels_like: feelsLike } = weatherData.main;
      const { description, icon } = weatherData.weather[0];
      console.log(`${temp} ${feelsLike} ${description}`);
      res.write('<h1>');
      res.write(`The temperature in ${weatherData.name} is ${temp}${unitSymbol}. `, 'utf8');
      res.write('</h1>');
      res.write('<p>');
      res.write(`The weather outside is ${description}. `);
      res.write('<p>');
      res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
      res.send();
    });
  });
}

app.post('/', (req, res) => {
  console.log('Post received');
  console.log(req.body.locMethod);
  console.log(req.body.locator);
  const { locMethod, locator } = req.body;
  getWeather(res, locMethod, locator, 'imperial');
});
