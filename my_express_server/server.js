const express = require('express');

const app = express();

/* eslint-disable no-console */
app.get('/', (req, res) => {
  res.send('<h1>Hello, world!</h1>');
});

app.get('/contact', (req, res) => {
  res.send('contact me at: cchandler145@gmail.com');
});

app.get('/about', (req, res) => {
  res.send('At this point in 2020, Charles hates everybody and everything.');
});

app.get('/hobbies', (req, res) => {
  res.send('<ul><li>mixing drinks</li><li>playing DnD</li><li>electricity</li><li>paintball</li></ul>.  I am still deciding how many people in paintball to hate');
});

/* eslint-disable no-console */
app.listen(3145, () => {
  console.log('server started on port 3145');
});
