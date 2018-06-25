// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

//   db.collection('Todos').insertOne({
//     text: 'Something to do',
//     completed: false
//   }, (err, result) => {
//     if (err) {
//       return console.log(`Error: ${err}`)
//     }
//
//     console.log(JSON.stringify(result.ops), undefined, 2);
//   });
//
//   db.collection('Users').insertOne({
//     name: 'Lefty',
//     age: 18,
//     location: 'ZA'
//   }, (err, result) => {
//     if (err) {
//       return console.log(`Error: ${err}`)
//     }
//
//     console.log(JSON.stringify(result.ops, undefined, 2));
//
//     console.log(result.ops[0]._id.getTimestamp());
//   });

  client.close();
});
