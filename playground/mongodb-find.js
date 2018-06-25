// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({_id: new ObjectID('5b2fe66d3ed5592948fea7ac')}).toArray().then((docs) => {
  //   console.log('Todos', JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Lefty'}).toArray().then((docs) => {
    console.log('Matching Users: \n', JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

  // client.close();
});
