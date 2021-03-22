/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// using . instead of __dirname here because when . is used in a call to require,
//  it's evaluted relative the file containing the require statement.
//  __dirname is only ever needed because the currently working directory might not be
//  the same as the directory containing the file being executed.  In all cases other than
//  require, '.' will evaluate as the current working directory (https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js)
const cal = require('./date.js');

const port = 3145;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemsSchema);
const WorkItem = mongoose.model('WorkItem', itemsSchema);

const welcome = new Item({ name: 'Welcome to your todolist!' });
const addItem = new Item({ name: 'Hit the + button to add a new item' });
const deleteItem = new Item({ name: '<-- Hit this to delete an item' });
const defaultItems = [welcome, addItem, deleteItem];

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => Item.find({}))
  .then((list) => list.forEach((listItem) => console.log(listItem.name)))
  .then(() => {
    app.get('/', (req, res) => {
      const currentDay = cal.getDay();
      Item.find({})
        .then((items) => {
          if (items.length === 0) {
            return Item.insertMany(defaultItems)
              .then((insertRes) => {
                console.log(insertRes);
                return Item.find({});
              })
              .then((newItems) => newItems);
          }
          return items;
        })
        .then((retItems) => res.render('list', { listTitle: currentDay, listItems: retItems }));
    });

    app.post('/', (req, res) => {
      const { newItem, list } = req.body;

      if (list === 'Work Items') {
        const newWorkListItem = new WorkItem({ name: newItem });
        newWorkListItem.save();
        res.redirect('/work');
      } else {
        const newListItem = new Item({ name: newItem });
        newListItem.save();
        res.redirect('/');
      }
    });

    app.post('/delete', (req, res) => {
      const completedItemID = req.body.completed;
      Item.deleteOne({ _id: completedItemID })
        .then(() => res.redirect('/'));
    });

    app.get('/work', (req, res) => {
      WorkItem.find({})
        .then((retItems) => res.render('list', { listTitle: 'Work Items', listItems: retItems }));
    });

    app.get('/about', (req, res) => {
      res.render('about');
    });

    return app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
