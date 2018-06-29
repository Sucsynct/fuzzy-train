const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findByIdAndRemove('5b364a615d16b70fef8a2399').then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: new ObjectID('5b364a615d16b70fef8a2399')}).then((result) => {

// });