const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: new Date().getTime()
  }
];

beforeEach((done) => {
  Todo.remove().then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos',() => {
  it('should create a new todo', (done) => {
    let text = 'Test todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text}).then(docs => {
          expect(docs.length).toBe(1);
          expect(docs[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then(docs => {
          expect(docs.length).toBe(2);
          done();
        }).catch(e => done(e));
      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID invalid', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString() + '111'}`)
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    let hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((doc) => {
          expect(doc).toBeFalsy();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID invalid', (done) => {
    let hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId + '111'}`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update a todo', (done) => {
    let hexId = todos[0]._id.toHexString();
    let text = 'Changed';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text, completed: true})
      .expect(200)
      .expect((res) => {
        // expect(res.body.doc).toContain({text, completed: true});
        expect(res.body.doc.text).toBe(text);
        expect(res.body.doc.completed).toBe(true);
        expect(typeof res.body.doc.completedAt).toBe('number');
      })
      .end(done)
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = 'Changed';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text, completed: false})
      .expect(200)
      .expect((res) => {
        // expect(res.body.doc).toContain({text, completed: false});
        expect(res.body.doc.text).toBe(text);
        expect(res.body.doc.completed).toBe(false);
        expect(res.body.doc.completedAt).toBeFalsy();
      })
      .end(done)
  });

  it('should return 404 if ID not found', (done) => {
    request(app)
      .patch(`/todos/${new ObjectID()}`)
      .send({completed: true})
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID not found', (done) => {
    let hexId = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId + '111'}`)
      .send({completed: true})
      .expect(404)
      .end(done);
  });

});