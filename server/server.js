require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {ObjectID} = require('mongodb');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

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

    res.send({doc});
  }).catch(e => res.status(400).send('Could not delete todo.'))
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc) => {
    if (!doc) {
      return res.status(404).send(`Todo for ID (${id}) not found.`);
    }

    res.send({doc});
  }).catch(e => res.status(400).send());

});

app.post('/users', (req, res) => {
  let user = new User(_.pick(req.body, ['email', 'password']));

  user.save().then(() => {
    return user.generateAuthToken();
  }, (err) => {
    res.status(400).send(err);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch(e => res.status(400).send('Unable to create user.\n', e));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = {app};
