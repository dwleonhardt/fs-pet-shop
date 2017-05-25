const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/', function(req, res, next){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    data = JSON.parse(data);
    res.send(data);
  });
});

module.exports = router;
