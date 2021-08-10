const mongoose = import('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');
const fs = require('fs');
dotenv.config({ path: './.config.env' });
require('./db')();

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

console.log(tourData);

const importData = async () => {
  try {
    await Tour.create(tourData);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
