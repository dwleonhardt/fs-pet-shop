const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');




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
  var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
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
  var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
  var id = req.params.id;
  for (var key in req.body) {
    pets[id][key] = req.body[key];
  }
  var update = JSON.stringify(pets);
  fs.writeFile('./pets.json', update, function(err){
    if(err){
      throw err;
    }
    res.send(pets[id]);
  });


  // console.log(pets[id]);
});

router.delete('/:id', jsonParser, function(req, res, next){
  var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
  var id = req.params.id;
  var remove = pets[id];
  pets.splice(id, 1);
  console.log(pets);
  var update = JSON.stringify(pets);
  fs.writeFile('./pets.json', update, function(err){
    if(err){
      throw err;
    }
    res.send(remove);
  });


  // console.log(pets[id]);
});


module.exports = router;
