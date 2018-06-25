// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b30bf6d2798c3e2c632a70d')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // },
  //   {
  //     returnOriginal: false
  //   }
  // ).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b3089d7e2a69101f026e468')
  }, {
    $set: {
      name: 'Lefty'
    },
    $inc: {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // client.close();
});
