/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const mongoose = require('mongoose');

const port = 3145;

const url = 'mongodb://elite.lan:27017';
const dbName = 'wikiDB';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
