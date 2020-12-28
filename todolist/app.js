/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

// using . instead of __dirname here because when . is used in a call to require,
//  it's evaluted relative the file containing the require statement.
//  __dirname is only ever needed because the currently working directory might not be
//  the same as the directory containing the file being executed.  In all cases other than
//  require, '.' will evaluate as the current working directory (https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js)
const cal = require('./date.js');

const port = 3145;

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const currentDay = cal.getDay();
  res.render('list', { listTitle: currentDay, listItems: items });
});

app.post('/', (req, res) => {
  const { newItem, list } = req.body;

  if (list === 'Work Items') {
    workItems.push(newItem);
    res.redirect('/work');
  } else {
    items.push(newItem);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work Items', listItems: workItems });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
