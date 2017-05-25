const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));



router.get('/', function(req, res, next){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    data = JSON.parse(data);
    res.send(data);
  });
  next();
});

router.get('/:id', function(req, res, next){
    fs.readFile('./pets.json', 'utf8', function(err, data){
      data = JSON.parse(data);
      if (req.params.id < data.length && req.params.id > -1) {
        res.send(data[req.params.id]);
      }
      else {
        res.sendStatus(404);
      }
    });
});

router.post('/', jsonParser, function(req, res, next){

  if(req.body.name.length > 0){
    var nameVal = req.body.name;
    var ageVal = parseInt(req.body.age);
    var kindVal = req.body.kind;
    var petObj = {
      name: nameVal,
      age: ageVal,
      kind: kindVal
    };
    pets.push(petObj);
    var newPet = JSON.stringify(pets);
    fs.writeFile('pets.json', newPet, function (err) {
      if(err){
        res.sendStatus(400);
      }
      else {
        res.send(petObj);
      }
    });
  }
  else {
    res.sendStatus(400);
  }
});

router.patch('/:id', jsonParser, function(req, res, next){
      if (typeof req.body === 'object') {
        var id = req.params.id;
        pets[id] = req.body;
        // console.log(pets);
        res.send(req.body);
        // console.log(req.params.id);
        console.log(req.body);
      }
      else {
        res.sendStatus(404);
      }
});


module.exports = router;
