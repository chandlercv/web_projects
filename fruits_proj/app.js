/* eslint-disable no-console */
const mongoose = require('mongoose');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'fruitsDB';

async function run() {
  try {
    await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully to server');

    const fruitSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 10,
      },
      review: String,
    });

    const Fruit = mongoose.model('Fruit', fruitSchema);

    const fruit = new Fruit({
      name: 'Apple',
      rating: 34,
      review: 'Hard to do better than a good Honeycrisp',
    });

    await fruit.save();

    const personSchema = new mongoose.Schema({
      name: String,
      age: Number,
    });

    const Person = mongoose.model('Person', personSchema);

    const person = new Person({
      name: 'John',
      age: 37,
    });

    // person.save();

    const kiwi = new Fruit({
      name: 'Kiwi',
      score: 4,
      review: 'Much too fuzzy',
    });

    const orange = new Fruit({
      name: 'Orange',
      score: 6,
      review: 'Kinda annoying.  Much better as a juice',
    });

    const banana = new Fruit({
      name: 'Banana',
      score: 7,
      review: 'Potassium is the gift that keeps on giving',
    });

    // await Fruit.insertMany([kiwi, orange, banana])
    //   .then(console.log('Sucessfully saved all fruits to fruitsDB'));

    await Fruit.find({})
      .then((fruitArr) => {
        fruitArr.forEach((foundFruit) => console.log(foundFruit.name));
      });
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
