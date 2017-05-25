const express = require('express');
const app = express();
const path = require('path');
const pets = require('./routes/pets');



app.use('/pets', pets);

app.listen(3000);

module.exports = app;
