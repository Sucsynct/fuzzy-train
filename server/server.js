let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {ObjectID} = require('mongodb');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send({docs});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not valid')
  }

  Todo.findById(id).then(doc => {
    if (!doc) {
      return res.status(404).send(`Todo for ID (${id}) not found.`)
    }

    res.send({doc});
  }).catch(e => res.status(400).send('Could not fetch todo.'));

});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).send(`Todo for ID (${id}) not found.`)
    }

    res.send(doc);
  }).catch(e => res.status(400).send('Could not delete todo.'))
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

module.exports = {app};
