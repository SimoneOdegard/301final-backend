'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const Data = require('./data.js');

app.use(express.urlencoded({extended:true}));

app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem);
app.delete('/items/:id', Data.deleteOneItem);
app.put('/items/:id', Data.updateOneItem);
app.post('/items', Data.addAnItem);

// proof of life
app.get('/', function (request, response) {
  response.send('Hello World')
})

app.use('*', (request,respond) => {
  respond.status(404).send('These are not the droids you are looking for.');
});

app.use( (error,request,respond) => {
  console.error(err.stack)
  respond.status(500).send(`My Bad ... ${error.message}`);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
