'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fs = require('fs');

const data = getData();

function getData(path = './1880-2016.json') {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }
  return data;
}

app.get('/temperture', function (req, res) {
  res.status(200).send(data);
});

app.listen(PORT, () => console.log(`FakeBook server listening on port ${PORT}!`));