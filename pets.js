var fs = require('fs');
var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
// console.log(pets);
// console.log(process.argv[2]);
// console.log(process.argv[3]);
var action = process.argv[2];
var index = process.argv[3];
// if (action !== 'read' || 'create' || 'update' || 'destroy') {
//   console.error(new Error('Usage: node pets.js [read | create | update | destroy]'));
// }

if(action === 'read'){
  console.log(pets[index]);
}
