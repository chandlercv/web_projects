const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* eslint-disable no-console */
app.get('/', (req, res) => {
  // the __dirname variable contains the pwd of the file that containss it
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);

  const result = num1 + num2;

  res.send(`Thanks for posting that! The result of the calculation is ${result}`);
});

app.get('/bmicalculator', (req, res) => {
  // the __dirname variable contains the pwd of the file that containss it
  res.sendFile(`${__dirname}/bmicalculator.html`);
});

app.post('/bmicalculator', (req, res) => {
  console.log('caclulating bmi');
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  console.log(`weight: ${weight}, height: ${height}`);

  const bmi = weight / (height ** 2);

  console.log(`bmi: ${bmi}`);

  res.send(`Thanks for posting that! The calculated BMI is ${bmi}`);
});

app.listen(3145, () => {
  console.log('server started on port 3145');
});
