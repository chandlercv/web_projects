/* eslint-disable no-console */
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', (req, res) => {
  const { email, firstName, lastName } = req.body;
  console.log(`post request recived {${email}, ${firstName}, ${lastName}}`);

  const subData = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  const jsonData = JSON.stringify(subData);

  const listID = 'dc1c7f919d';
  const url = `https://us15.api.mailchimp.com/3.0/lists/${listID}/members`;

  const options = {
    method: 'POST',
    auth: `charles:${apikey}`,
  };

  const request = https.request(url, options, (response) => {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }

    response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(3145, () => {
  console.log('server is running on port 3145');
});

// list id: dc1c7f919d
