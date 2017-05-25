var fs = require('fs');
var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
var action = process.argv[2];
var arg = process.argv[3];

if (!action) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

else if(action === 'read'){
  if (arg){
    console.log(pets[arg]);
  }
  else {
    console.log(pets);
  }
}
if (action === 'create'){
  if(process.argv.length === 6){
    var ageVal = parseInt(process.argv[3]);
    var kindVal = process.argv[4];
    var nameVal = process.argv[5];
    var petObj = {
      age: ageVal,
      kind: kindVal,
      name: nameVal
    };


    // console.log(current);
    pets.push(petObj);
    var newPet = JSON.stringify(pets);
    fs.writeFile('pets.json', newPet, function (err) {
      if(err){
        console.error('awwwww');
      }
      else{
        console.log(petObj);
      }
    });
  }
  else if (process.argv.length !== 6){
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
}
