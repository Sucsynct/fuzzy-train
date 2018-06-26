const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b3130c8dda1a838e06a3d3611';
let userId = '5b3104db760dae18d43438b7';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({_id: id}).then((docs) => {
//   console.log('Todos:\n', docs);
// });
//
// Todo.findOne({_id: id}).then((doc) => {
//   console.log('Todo:\n', doc);
// });

// Todo.findById(id).then((doc) => {
//   if (!doc) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID:\n', doc);
// }).catch(e => console.log(e));

User.findById(userId).then((doc) => {
  if (!doc) {
    return console.log('User not found')
  }

  console.log('User found:\n', doc);
}).catch(e => console.log(e));
