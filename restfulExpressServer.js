const express = require('express');
const app = express();
const pets = require('./routes/pets');


app.listen(3000);

app.use('/pets', pets);
