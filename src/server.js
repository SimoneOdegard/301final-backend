'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connected to the database');
// });

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

const Data = require('./data.js');

app.use(express.urlencoded({extended:true}));

app.post('/items', Data.addAnItem);
app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem);
app.delete('/items/:id', Data.deleteOneItem);
app.put('./items/:id', Data.updateOneItem);

app.use('*', (request,respond) => {
  respond.status(404).send('These are not the droids you are looking for.');
});

app.use( (error,request,respond,next) => {
  resspond.status(500).send(`My Bad ... ${error.message}`);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};

// app.listen(PORT, () => console.log(`listening on ${PORT}`));