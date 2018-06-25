// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneDeleteOne
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //Challenge
  db.collection('Users').deleteMany({name: 'Lefty'}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b309418d95411eccaeef2a2')}).then((result) => {
    console.log(result);
  });

  // client.close();
});
