const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');



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

module.exports = router;
